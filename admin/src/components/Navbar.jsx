import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { WorkerContext } from '../context/WorkerContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { dToken, setDToken, profileData, getProfileData } = useContext(WorkerContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (dToken && !profileData) {
      getProfileData()
    }
  }, [dToken, profileData])

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div className='flex justify-between items-center px-6 sm:px-10 py-3 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-50'>
      
      {/* Left side: Logo & Role */}
      <div className='flex items-center gap-4'>
        <img onClick={() => navigate('/')} className='w-36 sm:w-40 cursor-pointer hidden sm:block' src={assets.admin_logo} alt="Logo" />
        <img onClick={() => navigate('/')} className='w-10 cursor-pointer sm:hidden' src={assets.home_icon} alt="Logo" />
        <span className='inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-widest bg-primary/10 text-primary border border-primary/20'>
          {aToken ? 'ADMIN' : 'WORKER'}
        </span>
      </div>

      {/* Right side: User Profile & Logout */}
      <div className='flex items-center gap-4 sm:gap-6'>
        
        {/* Admin profile view */}
        {aToken && (
          <div className='flex items-center gap-3 border-r border-gray-200 pr-4 sm:pr-6'>
            <div className='hidden sm:flex flex-col items-end'>
              <p className='text-sm font-bold text-gray-800 leading-tight'>Adminstrator</p>
              <p className='text-[10px] text-gray-500 font-medium uppercase tracking-wider'>Management</p>
            </div>
            <div className='w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white font-bold shadow-md shadow-green-100 border-2 border-white'>
              A
            </div>
          </div>
        )}
        
        {/* Worker profile view */}
        {dToken && profileData && (
          <div className='flex items-center gap-3 border-r border-gray-200 pr-4 sm:pr-6'>
            <div className='hidden sm:flex flex-col items-end'>
              <p className='text-sm font-bold text-gray-800 leading-tight'>{profileData.name}</p>
              <p className='text-[10px] text-primary font-bold uppercase tracking-wider'>{profileData.speciality}</p>
            </div>
            <img 
              className='w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white shadow-md bg-gray-100' 
              src={profileData.image} 
              alt={profileData.name} 
            />
          </div>
        )}

        <button 
          onClick={logout} 
          className='btn-outline !py-1.5 !px-5 text-sm max-sm:text-xs shadow-none hover:shadow-sm'
        >
          Logout
        </button>
      </div>
      
    </div>
  )
}

export default Navbar