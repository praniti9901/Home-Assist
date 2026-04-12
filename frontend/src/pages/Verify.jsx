import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const Verify = () => {
  const [searchParams] = useSearchParams()
  const success = searchParams.get('success')
  const appointmentId = searchParams.get('appointmentId')

  const { backendUrl, token } = useContext(AppContext)
  const navigate = useNavigate()

  const verifyStripe = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/verifyStripe', { success, appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
      navigate('/my-booking')
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    if (token && appointmentId && success) {
      verifyStripe()
    }
  }, [token])

  return (
    <div className='min-h-[70vh] flex flex-col items-center justify-center gap-5'>
      {/* Spinner */}
      <div className='relative w-16 h-16'>
        <div className='w-16 h-16 rounded-full border-4 border-gray-100' />
        <div className='absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-primary animate-spin' />
      </div>
      <div className='text-center'>
        <p className='text-gray-700 font-semibold text-lg'>Verifying Payment</p>
        <p className='text-gray-400 text-sm mt-1'>Please wait, do not close this tab...</p>
      </div>
    </div>
  )
}

export default Verify