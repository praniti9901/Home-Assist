import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const slotDateFormat = (slotDate) => {
  const [d, m, y] = slotDate.split('_')
  return `${d} ${months[Number(m)]} ${y}`
}

const StatusBadge = ({ appointment }) => {
  if (appointment.isCompleted) return (
    <span className='inline-flex items-center gap-1.5 text-emerald-600 bg-emerald-50 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-100'>
      <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M5 13l4 4L19 7' /></svg>
      Completed
    </span>
  )
  if (appointment.cancelled) return (
    <span className='inline-flex items-center gap-1.5 text-red-500 bg-red-50 text-xs font-semibold px-3 py-1.5 rounded-full border border-red-100'>
      <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M6 18L18 6M6 6l12 12' /></svg>
      Cancelled
    </span>
  )
  if (appointment.payment) return (
    <span className='inline-flex items-center gap-1.5 text-blue-600 bg-blue-50 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-100'>
      <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M5 13l4 4L19 7' /></svg>
      Paid
    </span>
  )
  return (
    <span className='inline-flex items-center gap-1.5 text-amber-600 bg-amber-50 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-100'>
      <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>
      Pending Payment
    </span>
  )
}

const MyBooking = () => {
  const { backendUrl, token } = useContext(AppContext)
  const navigate = useNavigate()

  const [appointments, setAppointments] = useState([])
  const [payment, setPayment] = useState('')

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Service Payment',
      description: 'Service Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, { headers: { token } })
          if (data.success) {
            navigate('/my-booking')
            getUserAppointments()
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if (data.success) {
        initPay(data.order)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) getUserAppointments()
  }, [token])

  return (
    <div className='py-8'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>My Bookings</h1>
        <p className='text-gray-400 text-sm mt-1'>{appointments.length} total booking{appointments.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Empty state */}
      {appointments.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-gray-100 shadow-sm'>
          <div className='w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4'>
            <svg className='w-8 h-8 text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
            </svg>
          </div>
          <p className='text-gray-500 font-semibold'>No bookings yet</p>
          <p className='text-gray-300 text-sm mt-1 mb-6'>Book your first home service today!</p>
          <button onClick={() => navigate('/workers')} className='btn-primary text-sm'>
            Browse Services
          </button>
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {appointments.map((item, index) => (
            <div key={index} className='bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-5 p-5 hover:shadow-md hover:border-gray-200 transition-all duration-200'>
              {/* Image */}
              <div className='sm:w-28 sm:h-28 w-full h-44 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-50 to-green-100 flex-shrink-0'>
                <img className='w-full h-full object-cover object-top' src={item.docData.image} alt={item.docData.name} />
              </div>

              {/* Details */}
              <div className='flex-1 min-w-0'>
                <div className='flex items-start justify-between gap-4 flex-wrap mb-3'>
                  <div>
                    <p className='text-gray-800 font-bold text-lg'>{item.docData.name}</p>
                    <p className='text-primary text-sm font-medium'>{item.docData.speciality}</p>
                  </div>
                  <StatusBadge appointment={item} />
                </div>

                <div className='flex flex-col gap-1.5 text-sm text-gray-400'>
                  <div className='flex items-center gap-2'>
                    <svg className='w-4 h-4 text-gray-300 shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                    </svg>
                    <span>{item.docData.address.line1}, {item.docData.address.line2}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <svg className='w-4 h-4 text-gray-300 shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                    </svg>
                    <span className='text-gray-600 font-medium'>{slotDateFormat(item.slotDate)}</span>
                    <span className='text-gray-300'>•</span>
                    <span>{item.slotTime}</span>
                  </div>
                </div>

                {/* Action buttons */}
                {!item.cancelled && !item.isCompleted && (
                  <div className='flex flex-wrap gap-2 mt-4'>
                    {!item.payment && payment !== item._id && (
                      <button
                        onClick={() => setPayment(item._id)}
                        className='btn-primary text-xs py-2 px-5'
                      >
                        Pay Now
                      </button>
                    )}
                    {!item.payment && payment === item._id && (
                      <>
                        <button onClick={() => appointmentRazorpay(item._id)} className='flex items-center gap-2 border border-gray-200 text-gray-600 text-xs font-medium px-4 py-2 rounded-full hover:bg-gray-50 transition-all'>
                          <img className='h-4 object-contain' src={assets.razorpay_logo} alt='Razorpay' />
                        </button>
                        <button className='flex items-center gap-2 border border-gray-200 text-gray-600 text-xs font-medium px-4 py-2 rounded-full hover:bg-gray-50 transition-all'>
                          Cash on Service
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className='border border-red-200 text-red-500 text-xs font-medium px-5 py-2 rounded-full hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200'
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBooking