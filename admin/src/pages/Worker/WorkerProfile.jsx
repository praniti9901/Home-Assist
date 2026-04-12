import React, { useContext, useEffect, useState } from 'react'
import { WorkerContext } from '../../context/WorkerContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const WorkerProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData } = useContext(WorkerContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {

        try {

            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }

            setIsEdit(false)

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div className='p-6 w-full max-w-4xl'>
            <p className='mb-6 font-bold text-gray-800 text-2xl'>My Profile</p>

            <div className='bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden'>
                
                {/* Header strip */}
                <div className='h-32 bg-gradient-to-r from-primary via-emerald-500 to-green-400 relative'>
                  <div className='absolute inset-0 opacity-20'>
                    <div className='absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2' />
                  </div>
                </div>

                <div className='px-8 max-sm:px-6 pb-10'>
                    {/* Avatar */}
                    <div className='flex items-end gap-6 -mt-16 mb-8'>
                        <div className='w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-gray-100'>
                            <img className='w-full h-full object-cover object-top' src={profileData.image} alt={profileData.name} />
                        </div>
                        <div className='pb-2'>
                            <p className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
                                {profileData.name}
                            </p>
                            <p className='text-sm font-medium text-primary mt-1'>
                                {profileData.speciality} &bull; <span className='text-gray-500 font-normal'>{profileData.experience} exp</span>
                            </p>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8'>
                        
                        {/* Left Column */}
                        <div className='flex flex-col gap-6'>
                            <div className='bg-gray-50/50 p-6 rounded-xl border border-gray-100'>
                                <p className='text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2 flex items-center gap-2'>
                                    <svg className='w-3.5 h-3.5 text-primary' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Booking Details
                                </p>
                                <div className='mt-4'>
                                    <p className='text-sm font-medium text-gray-500 mb-2'>Service Fee per visit</p>
                                    <div className='flex items-center gap-2'>
                                        <span className='font-bold text-gray-800 text-lg'>{currency}</span>
                                        {isEdit ? (
                                            <input type='number' className='form-input !mt-0 !py-1.5 w-32' onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} />
                                        ) : (
                                            <span className='font-bold text-gray-800 text-lg'>{profileData.fees}</span>
                                        )}
                                    </div>
                                </div>
                                <div className='mt-6 pt-6 border-t border-gray-200'>
                                    <p className='text-sm font-medium text-gray-500 mb-3'>Availability Status</p>
                                    <label className="relative flex items-center cursor-pointer select-none">
                                        <input 
                                          type="checkbox" 
                                          className="sr-only peer"
                                          disabled={!isEdit}
                                          onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} 
                                          checked={profileData.available} 
                                        />
                                        <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary ${!isEdit ? 'opacity-70 cursor-not-allowed' : ''}`}></div>
                                        <span className={`ml-3 text-sm font-bold ${profileData.available ? 'text-primary' : 'text-gray-500'}`}>
                                            {profileData.available ? 'Currently Accepting Bookings' : 'Not Available'}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className='flex flex-col gap-6'>
                            <div>
                                <p className='text-sm font-semibold text-gray-800 mb-2'>About Worker</p>
                                {isEdit ? (
                                    <textarea 
                                      onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} 
                                      className='form-input border-dashed bg-gray-50 resize-y min-h-[120px]' 
                                      value={profileData.about} 
                                    />
                                ) : (
                                    <p className='text-sm text-gray-600 leading-relaxed bg-white border border-transparent'>
                                        {profileData.about}
                                    </p>
                                )}
                            </div>

                            <div className='mt-2'>
                                <p className='text-sm font-semibold text-gray-800 mb-2'>Address</p>
                                {isEdit ? (
                                    <div className='space-y-3'>
                                        <input type='text' className='form-input' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} placeholder="Line 1" />
                                        <input type='text' className='form-input' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} placeholder="Line 2" />
                                    </div>
                                ) : (
                                    <p className='text-sm text-gray-600 leading-relaxed'>
                                        {profileData.address.line1}<br />
                                        {profileData.address.line2}
                                    </p>
                                )}
                            </div>
                        </div>

                    </div>

                    <div className='mt-10 border-t border-gray-100 pt-6 flex justify-end gap-3'>
                        {isEdit ? (
                            <>
                                <button onClick={() => {setIsEdit(false); getProfileData();}} className='px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-all text-sm'>
                                    Cancel
                                </button>
                                <button onClick={updateProfile} className='btn-primary text-sm shadow-md shadow-green-100'>
                                    Save Changes
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setIsEdit(true)} className='btn-outline text-sm'>
                                Edit Profile
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default WorkerProfile