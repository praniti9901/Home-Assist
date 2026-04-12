import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { WorkerContext } from '../../context/WorkerContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const WorkerDashboard = () => {

  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(WorkerContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  return dashData && (
    <div className='p-6 w-full max-w-6xl'>
      
      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
        <div className='dash-card flex items-center gap-4 group'>
          <div className='w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center group-hover:-translate-y-1 transition-transform'>
            <img className='w-8 option-contain text-emerald-600' src={assets.earning_icon} alt="" />
          </div>
          <div>
            <p className='text-3xl font-bold text-gray-800'>{currency} {dashData.earnings}</p>
            <p className='text-sm text-gray-500 font-medium'>Earnings</p>
          </div>
        </div>
        
        <div className='dash-card flex items-center gap-4 group'>
          <div className='w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:-translate-y-1 transition-transform'>
            <img className='w-8 option-contain' src={assets.appointments_icon} alt="" />
          </div>
          <div>
            <p className='text-3xl font-bold text-gray-800'>{dashData.appointments}</p>
            <p className='text-sm text-gray-500 font-medium'>Bookings</p>
          </div>
        </div>
        
        <div className='dash-card flex items-center gap-4 group'>
          <div className='w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:-translate-y-1 transition-transform'>
            <img className='w-8 option-contain' src={assets.patients_icon} alt="" />
          </div>
          <div>
            <p className='text-3xl font-bold text-gray-800'>{dashData.patients}</p>
            <p className='text-sm text-gray-500 font-medium'>Users Served</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className='mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
        <div className='flex items-center gap-3 px-6 py-5 border-b border-gray-100 bg-gray-50/50'>
          <div className='bg-primary/10 p-2 rounded-lg'>
            <img className='w-5' src={assets.list_icon} alt="" />
          </div>
          <p className='font-bold text-gray-800 text-lg'>Latest Bookings</p>
        </div>

        <div className='divide-y divide-gray-100'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-6 py-4 gap-4 hover:bg-gray-50 transition-colors' key={index}>
              <img className='rounded-xl w-12 h-12 object-cover bg-gray-50 border border-gray-100' src={item.userData.image} alt="" />
              <div className='flex-1 min-w-0'>
                <p className='text-gray-800 font-bold truncate'>{item.userData.name}</p>
                <div className='flex flex-wrap items-center gap-2 mt-0.5 text-sm'>
                  <span className='text-gray-500'>Booking on</span>
                  <span className='font-medium text-primary'>{slotDateFormat(item.slotDate)}</span>
                </div>
              </div>
              
              <div className='flex justify-end'>
                {item.cancelled ? (
                  <span className='inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100'>
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className='inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100'>
                    Completed
                  </span>
                ) : (
                  <div className='flex items-center gap-2'>
                    <button 
                      onClick={() => cancelAppointment(item._id)} 
                      className='p-2 text-red-400 bg-red-50 hover:bg-red-500 hover:text-white rounded-full transition-colors'
                      title="Cancel Booking"
                    >
                      <img className='w-5 h-5 filter brightness-0 invert' style={{ filter: 'invert(52%) sepia(51%) saturate(2326%) hue-rotate(317deg) brightness(101%) contrast(97%)' }} src={assets.cancel_icon} alt="cancel" />
                    </button>
                    <button 
                      onClick={() => completeAppointment(item._id)} 
                      className='p-2 text-green-500 bg-green-50 hover:bg-green-500 hover:text-white rounded-full transition-colors'
                      title="Complete Booking"
                    >
                      <img className='w-5 h-5 filter brightness-0 invert' style={{ filter: 'invert(52%) sepia(51%) saturate(2326%) hue-rotate(90deg) brightness(101%) contrast(97%)' }} src={assets.tick_icon} alt="complete" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {dashData.latestAppointments.length === 0 && (
            <div className='p-8 text-center text-gray-500'>
              No latest bookings found.
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default WorkerDashboard