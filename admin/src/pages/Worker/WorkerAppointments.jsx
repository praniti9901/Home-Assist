import React from 'react'
import { useContext, useEffect } from 'react'
import { WorkerContext } from '../../context/WorkerContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const WorkerAppointments = () => {

  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(WorkerContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className='p-6 w-full max-w-6xl'>

      <p className='mb-6 font-bold text-gray-800 text-2xl'>All Bookings</p>

      <div className='bg-white border md:border-gray-100 md:shadow-sm md:rounded-2xl text-sm max-h-[80vh] overflow-y-scroll overflow-hidden'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1.5fr] gap-2 py-4 px-6 border-b border-gray-100 bg-gray-50/50 font-semibold text-gray-600'>
          <p>#</p>
          <p>User</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        
        <div className='divide-y divide-gray-100'>
          {appointments.map((item, index) => (
            <div className='flex flex-wrap justify-between max-sm:gap-3 sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1.5fr] gap-2 items-center text-gray-600 py-4 px-6 hover:bg-gray-50 transition-colors' key={index}>
              
              <p className='max-sm:hidden text-gray-400 font-medium'>{index+1}</p>
              
              <div className='flex items-center gap-3'>
                <img src={item.userData.image} className='w-9 h-9 rounded-full object-cover border border-gray-200' alt="" /> 
                <p className='font-medium text-gray-800'>{item.userData.name}</p>
              </div>
              
              <div>
                <span className={`inline-flex items-center px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-full border ${item.payment ? 'bg-primary/5 text-primary border-primary/20' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                  {item.payment ? 'ONLINE' : 'CASH'}
                </span>
              </div>
              
              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              
              <p className='font-medium'>{slotDateFormat(item.slotDate)}, <span className='text-gray-400 font-normal'>{item.slotTime}</span></p>
              
              <p className='font-semibold text-primary'>{currency}{item.amount}</p>
              
              <div className='flex justify-end sm:justify-start'>
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
                      className='p-1.5 md:p-2 text-red-400 bg-red-50 hover:bg-red-500 hover:text-white rounded-full transition-colors border border-red-100'
                      title="Cancel Booking"
                    >
                      <svg className="w-4 h-4 md:w-5 md:h-5 filter invert" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <button 
                      onClick={() => completeAppointment(item._id)} 
                      className='p-1.5 md:p-2 text-emerald-500 bg-emerald-50 hover:bg-emerald-500 hover:text-white rounded-full transition-colors border border-emerald-100'
                      title="Complete Booking"
                    >
                      <svg className="w-4 h-4 md:w-5 md:h-5 filter invert" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {appointments.length === 0 && (
             <div className='p-12 text-center text-gray-500'>
               No bookings assigned to you yet.
             </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default WorkerAppointments