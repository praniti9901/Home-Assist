import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedWorkers from '../components/RelatedWorkers'
import axios from 'axios'
import { toast } from 'react-toastify'

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const Booking = () => {
  const { docId } = useParams()
  const { workers, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)

  const [docInfo, setDocInfo] = useState(false)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [bookingLoading, setBookingLoading] = useState(false)

  const navigate = useNavigate()

  const fetchDocInfo = async () => {
    const docInfo = workers.find((doc) => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])
    let today = new Date()

    for (let i = 0; i < 20; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()
        const slotDate = day + '_' + month + '_' + year
        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(formattedTime) ? false : true

        if (isSlotAvailable) {
          timeSlots.push({ datetime: new Date(currentDate), time: formattedTime })
        }
        currentDate.setMinutes(currentDate.getMinutes() + 60)
      }
      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warning('Please log in to book a service')
      return navigate('/login')
    }
    if (!slotTime) {
      return toast.warning('Please select a time slot')
    }

    setBookingLoading(true)
    const date = docSlots[slotIndex][0].datetime
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    const slotDate = day + '_' + month + '_' + year

    try {
      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-booking')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setBookingLoading(false)
    }
  }

  useEffect(() => {
    if (workers.length > 0) fetchDocInfo()
  }, [workers, docId])

  useEffect(() => {
    if (docInfo) getAvailableSlots()
  }, [docInfo])

  if (!docInfo) return (
    <div className='min-h-[60vh] flex items-center justify-center'>
      <div className='w-10 h-10 border-3 border-gray-200 border-t-primary rounded-full animate-spin' />
    </div>
  )

  return (
    <div className='py-8'>
      {/* Worker Details Panel */}
      <div className='flex flex-col sm:flex-row gap-6 mb-10'>
        {/* Image */}
        <div className='sm:w-64 md:w-72 w-full flex-shrink-0'>
          <div className='rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-50 to-green-100 aspect-[3/4]'>
            <img
              className='w-full h-full object-cover object-top'
              src={docInfo.image}
              alt={docInfo.name}
            />
          </div>
        </div>

        {/* Info Card */}
        <div className='flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8'>
          {/* Name + badge */}
          <div className='flex items-center gap-3 mb-3'>
            <h1 className='text-2xl font-bold text-gray-800'>{docInfo.name}</h1>
            <img className='w-5 h-5' src={assets.verified_icon} alt='Verified' />
          </div>

          {/* Experience badge */}
          <div className='flex items-center gap-3 mb-5'>
            <span className='inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full'>
              {docInfo.experience}
            </span>
            <div className='badge-available'>
              <span className='w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse' />
              Available
            </div>
          </div>

          {/* About */}
          <div className='mb-5'>
            <div className='flex items-center gap-2 mb-2'>
              <p className='text-sm font-semibold text-gray-700'>About</p>
              <img className='w-3.5 h-3.5' src={assets.info_icon} alt='Info' />
            </div>
            <p className='text-sm text-gray-500 leading-7 max-w-2xl'>{docInfo.about}</p>
          </div>

          {/* Fee */}
          <div className='flex items-center gap-2 pt-4 border-t border-gray-50'>
            <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
            <p className='text-gray-500 text-sm'>Service fee: <span className='text-gray-800 font-bold text-base'>{currencySymbol}{docInfo.fees}</span></p>
          </div>
        </div>
      </div>

      {/* Booking Slots */}
      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-8'>
        <h2 className='text-lg font-bold text-gray-800 mb-6'>Select Appointment Slot</h2>

        {/* Day selector */}
        <div>
          <p className='text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3'>Choose Date</p>
          <div className='flex gap-3 overflow-x-auto pb-2'>
            {docSlots.length > 0 && docSlots.map((item, index) => (
              <button
                key={index}
                onClick={() => { setSlotIndex(index); setSlotTime('') }}
                className={`flex flex-col items-center min-w-[64px] py-4 px-3 rounded-2xl text-sm font-medium transition-all duration-200 flex-shrink-0 ${
                  slotIndex === index
                    ? 'bg-primary text-white shadow-lg shadow-green-200'
                    : 'bg-gray-50 text-gray-600 border border-gray-100 hover:border-primary/30 hover:bg-primary/5'
                }`}
              >
                <span className='text-xs font-semibold mb-1 opacity-80'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</span>
                <span className='text-lg font-bold'>{item[0] && item[0].datetime.getDate()}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time slots */}
        <div className='mt-6'>
          <p className='text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3'>Choose Time</p>
          <div className='flex flex-wrap gap-2'>
            {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
              <button
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all duration-200 ${
                  item.time === slotTime
                    ? 'bg-primary text-white border-primary shadow-md shadow-green-200'
                    : 'border-gray-100 text-gray-500 bg-gray-50 hover:border-primary/40 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {item.time.toLowerCase()}
              </button>
            ))}
          </div>
          {docSlots[slotIndex] && docSlots[slotIndex].length === 0 && (
            <p className='text-gray-300 text-sm py-4'>No slots available for this day.</p>
          )}
        </div>

        {/* Confirm button */}
        <div className='mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4'>
          <button
            onClick={bookAppointment}
            disabled={bookingLoading}
            className='flex items-center gap-2 bg-primary text-white font-semibold px-10 py-3.5 rounded-full hover:bg-primary-dark hover:shadow-lg hover:shadow-green-200 hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed text-sm'
          >
            {bookingLoading
              ? <><div className='w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin' />Booking...</>
              : <>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                </svg>
                Confirm Booking
              </>
            }
          </button>
          {slotTime && (
            <p className='text-gray-400 text-xs'>
              Selected: <span className='text-gray-700 font-medium'>{daysOfWeek[docSlots[slotIndex][0]?.datetime.getDay()]}, {docSlots[slotIndex][0]?.datetime.getDate()} • {slotTime}</span>
            </p>
          )}
        </div>
      </div>

      {/* Related Workers */}
      <RelatedWorkers speciality={docInfo.speciality} docId={docId} />
    </div>
  )
}

export default Booking