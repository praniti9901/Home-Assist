import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)
  const [saving, setSaving] = useState(false)

  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

  const updateUserProfileData = async () => {
    setSaving(true)
    try {
      const birthDate = new Date(userData.dob)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      const m = today.getMonth() - birthDate.getMonth()
      const isBirthdayPassed = m > 0 || (m === 0 && today.getDate() >= birthDate.getDate())
      const actualAge = isBirthdayPassed ? age : age - 1

      if (actualAge < 18) {
        toast.error('You must be at least 18 years old.')
        return
      }

      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      if (image) formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setSaving(false)
    }
  }

  if (!userData) return (
    <div className='min-h-[60vh] flex items-center justify-center'>
      <div className='w-10 h-10 border-3 border-gray-200 border-t-primary rounded-full animate-spin' />
    </div>
  )

  return (
    <div className='py-8 max-w-2xl'>
      {/* Page header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>My Profile</h1>
        <p className='text-gray-400 text-sm mt-1'>Manage your personal information</p>
      </div>

      {/* Profile card */}
      <div className='bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden'>
        {/* Header strip */}
        <div className='h-24 bg-gradient-to-r from-primary via-emerald-500 to-green-400 relative'>
          <div className='absolute inset-0 opacity-20'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2' />
          </div>
        </div>

        <div className='px-6 sm:px-8 pb-8'>
          {/* Avatar */}
          <div className='flex items-end gap-5 -mt-12 mb-6'>
            {isEdit ? (
              <label htmlFor='image' className='cursor-pointer group relative'>
                <div className='w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg'>
                  <img
                    className='w-full h-full object-cover opacity-90 group-hover:opacity-75 transition-opacity'
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt={userData.name}
                  />
                </div>
                <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                  <div className='bg-black/50 rounded-xl w-full h-full flex items-center justify-center'>
                    <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 13a3 3 0 11-6 0 3 3 0 016 0z' />
                    </svg>
                  </div>
                </div>
                <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden accept='image/*' />
              </label>
            ) : (
              <div className='w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg'>
                <img className='w-full h-full object-cover' src={userData.image} alt={userData.name} />
              </div>
            )}

            <div className='pb-1'>
              {isEdit ? (
                <input
                  className='form-input text-xl font-bold text-gray-800 max-w-52'
                  type='text'
                  onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                  value={userData.name}
                />
              ) : (
                <h2 className='text-xl font-bold text-gray-800'>{userData.name}</h2>
              )}
              <p className='text-gray-400 text-sm mt-0.5'>{userData.email}</p>
            </div>
          </div>

          <hr className='border-gray-100 mb-6' />

          {/* Contact Info */}
          <div className='mb-6'>
            <p className='text-xs text-gray-400 font-semibold uppercase tracking-wider mb-4 flex items-center gap-2'>
              <svg className='w-3.5 h-3.5 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
              </svg>
              Contact Information
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-y-4 gap-x-4'>
              <p className='text-sm font-medium text-gray-500'>Email</p>
              <p className='text-sm text-primary font-medium'>{userData.email}</p>

              <p className='text-sm font-medium text-gray-500'>Phone</p>
              {isEdit ? (
                <input
                  className='form-input text-sm'
                  type='text'
                  onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                  value={userData.phone}
                  placeholder='Phone number'
                />
              ) : (
                <p className='text-sm text-gray-700'>{userData.phone || '—'}</p>
              )}

              <p className='text-sm font-medium text-gray-500'>Address</p>
              {isEdit ? (
                <div className='flex flex-col gap-2'>
                  <input
                    className='form-input text-sm'
                    type='text'
                    onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                    value={userData.address.line1}
                    placeholder='Address line 1'
                  />
                  <input
                    className='form-input text-sm'
                    type='text'
                    onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                    value={userData.address.line2}
                    placeholder='Address line 2'
                  />
                </div>
              ) : (
                <p className='text-sm text-gray-700'>{userData.address.line1 || '—'}<br />{userData.address.line2}</p>
              )}
            </div>
          </div>

          <hr className='border-gray-100 mb-6' />

          {/* Basic Info */}
          <div className='mb-8'>
            <p className='text-xs text-gray-400 font-semibold uppercase tracking-wider mb-4 flex items-center gap-2'>
              <svg className='w-3.5 h-3.5 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
              </svg>
              Basic Information
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-y-4 gap-x-4'>
              <p className='text-sm font-medium text-gray-500'>Gender</p>
              {isEdit ? (
                <select
                  className='form-input text-sm w-40'
                  onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                  value={userData.gender}
                >
                  <option value='Not Selected'>Not Selected</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                </select>
              ) : (
                <p className='text-sm text-gray-700'>{userData.gender || '—'}</p>
              )}

              <p className='text-sm font-medium text-gray-500'>Date of Birth</p>
              {isEdit ? (
                <input
                  className='form-input text-sm w-44'
                  type='date'
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                  onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                  value={userData.dob}
                />
              ) : (
                <p className='text-sm text-gray-700'>{userData.dob || '—'}</p>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className='flex gap-3'>
            {isEdit ? (
              <>
                <button
                  onClick={updateUserProfileData}
                  disabled={saving}
                  className='flex items-center gap-2 btn-primary text-sm disabled:opacity-60 disabled:cursor-not-allowed'
                >
                  {saving
                    ? <><div className='w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin' />Saving...</>
                    : <><svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M5 13l4 4L19 7' /></svg>Save Changes</>
                  }
                </button>
                <button
                  onClick={() => { setIsEdit(false); setImage(false) }}
                  className='px-5 py-2.5 rounded-full text-sm font-medium text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors'
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className='flex items-center gap-2 btn-outline text-sm'
              >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                </svg>
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile