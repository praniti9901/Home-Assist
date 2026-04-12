import React, { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {

  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='p-6 w-full max-w-6xl'>

      <p className='mb-6 font-bold text-gray-800 text-2xl'>All Bookings</p>

      <div className='bg-white border md:border-gray-100 md:shadow-sm md:rounded-2xl text-sm max-h-[80vh] overflow-y-scroll overflow-hidden'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-4 px-6 border-b border-gray-100 bg-gray-50/50 font-semibold text-gray-600'>
          <p>#</p>
          <p>Users</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Worker</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        
        <div className='divide-y divide-gray-100'>
          {appointments.map((item, index) => (
            <div className='flex flex-wrap justify-between max-sm:gap-3 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-600 py-4 px-6 hover:bg-gray-50 transition-colors' key={index}>
              <p className='max-sm:hidden text-gray-400 font-medium'>{index+1}</p>
              
              <div className='flex items-center gap-3'>
                <img src={item.userData.image} className='w-9 h-9 rounded-full object-cover border border-gray-200' alt="" /> 
                <p className='font-medium text-gray-800'>{item.userData.name}</p>
              </div>
              
              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              
              <p className='font-medium'>{slotDateFormat(item.slotDate)}, <span className='text-gray-400 font-normal'>{item.slotTime}</span></p>
              
              <div className='flex items-center gap-3'>
                <img src={item.docData.image} className='w-9 h-9 rounded-full object-cover bg-emerald-50 border border-gray-200' alt="" /> 
                <p className='text-gray-800 font-medium'>{item.docData.name}</p>
              </div>
              
              <p className='font-semibold text-primary'>{currency}{item.amount}</p>
              
              <div className='flex justify-end sm:justify-start'>
                {item.cancelled ? (
                  <span className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100'>
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100'>
                    Completed
                  </span>
                ) : (
                  <button 
                    onClick={() => cancelAppointment(item._id)} 
                    className='p-2 text-red-400 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors'
                    title="Cancel Booking"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                )}
              </div>
            </div>
          ))}
          {appointments.length === 0 && (
            <div className='p-12 text-center text-gray-500'>
              No bookings have been made yet.
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default AllAppointments