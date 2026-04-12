import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { WorkerContext } from '../context/WorkerContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {

  const { dToken } = useContext(WorkerContext)
  const { aToken } = useContext(AdminContext)

  const navLinkClass = ({ isActive }) => 
    `flex items-center gap-3 py-3.5 px-4 md:px-8 md:min-w-[260px] cursor-pointer transition-all duration-200 border-r-4 ${
      isActive 
        ? 'active-link' 
        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-800'
    }`

  return (
    <div className='min-h-[calc(100vh-73px)] w-20 md:w-auto bg-white border-r border-gray-100 flex-shrink-0'>
      
      {aToken && (
        <ul className='mt-6 flex flex-col gap-1'>
          <NavLink to={'/admin-dashboard'} className={navLinkClass}>
            <img className='w-5 opacity-70 group-[.active-link]:opacity-100' src={assets.home_icon} alt='' />
            <p className='hidden md:block font-medium'>Dashboard</p>
          </NavLink>
          <NavLink to={'/all-appointments'} className={navLinkClass}>
            <img className='w-5 opacity-70 group-[.active-link]:opacity-100' src={assets.appointment_icon} alt='' />
            <p className='hidden md:block font-medium'>Bookings</p>
          </NavLink>
          <NavLink to={'/add-worker'} className={navLinkClass}>
            <img className='w-5 opacity-70 group-[.active-link]:opacity-100' src={assets.add_icon} alt='' />
            <p className='hidden md:block font-medium'>Add Worker</p>
          </NavLink>
          <NavLink to={'/worker-list'} className={navLinkClass}>
            <img className='w-5 opacity-70 group-[.active-link]:opacity-100' src={assets.people_icon} alt='' />
            <p className='hidden md:block font-medium'>Workers List</p>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className='mt-6 flex flex-col gap-1'>
          <NavLink to={'/worker-dashboard'} className={navLinkClass}>
            <img className='w-5 opacity-70 group-[.active-link]:opacity-100' src={assets.home_icon} alt='' />
            <p className='hidden md:block font-medium'>Dashboard</p>
          </NavLink>
          <NavLink to={'/worker-appointments'} className={navLinkClass}>
            <img className='w-5 opacity-70 group-[.active-link]:opacity-100' src={assets.appointment_icon} alt='' />
            <p className='hidden md:block font-medium'>Bookings</p>
          </NavLink>
          <NavLink to={'/worker-profile'} className={navLinkClass}>
            <img className='w-5 opacity-70 group-[.active-link]:opacity-100' src={assets.people_icon} alt='' />
            <p className='hidden md:block font-medium'>Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  )
}

export default Sidebar