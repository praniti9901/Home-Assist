import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/workers', label: 'Services' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-white'}`}>
        <div className='flex items-center justify-between py-4 border-b border-gray-100'>
          {/* Logo */}
          <img
            onClick={() => navigate('/')}
            className='w-40 cursor-pointer'
            src={assets.logo}
            alt='HomeAssist'
          />

          {/* Desktop Nav */}
          <ul className='hidden md:flex items-center gap-1'>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </ul>

          {/* Auth / Profile */}
          <div className='flex items-center gap-3'>
            {token && userData ? (
              <div className='flex items-center gap-2 cursor-pointer group relative'>
                <div className='flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-colors'>
                  <img
                    className='w-8 h-8 rounded-full object-cover ring-2 ring-primary/30'
                    src={userData.image}
                    alt={userData.name}
                  />
                  <svg className='w-3 h-3 text-gray-400 group-hover:text-primary transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                  </svg>
                </div>
                {/* Dropdown */}
                <div className='absolute top-full right-0 mt-1 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0'>
                  <div className='px-4 py-3 border-b border-gray-50'>
                    <p className='text-sm font-semibold text-gray-800'>{userData.name}</p>
                    <p className='text-xs text-gray-400 mt-0.5'>{userData.email}</p>
                  </div>
                  <button onClick={() => navigate('/my-profile')} className='w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary flex items-center gap-2 transition-colors'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' /></svg>
                    My Profile
                  </button>
                  <button onClick={() => navigate('/my-booking')} className='w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary flex items-center gap-2 transition-colors'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' /></svg>
                    My Bookings
                  </button>
                  <button onClick={logout} className='w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2 transition-colors mt-1 border-t border-gray-50'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' /></svg>
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className='hidden md:flex items-center gap-2 btn-primary text-sm'
              >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' /></svg>
                Sign In
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setShowMenu(true)}
              className='md:hidden p-2 rounded-xl hover:bg-gray-50 transition-colors'
            >
              <svg className='w-5 h-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${showMenu ? 'visible' : 'invisible'}`}>
        {/* Backdrop */}
        <div
          onClick={() => setShowMenu(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${showMenu ? 'opacity-100' : 'opacity-0'}`}
        />
        {/* Sidebar */}
        <div className={`absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className='flex items-center justify-between px-6 py-5 border-b border-gray-100'>
            <img src={assets.logo} className='w-32' alt='HomeAssist' />
            <button onClick={() => setShowMenu(false)} className='p-2 rounded-xl hover:bg-gray-50 transition-colors'>
              <svg className='w-5 h-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
          <div className='flex flex-col p-4 gap-1 flex-1'>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setShowMenu(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive ? 'text-primary bg-primary/10' : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          {!token && (
            <div className='p-4 border-t border-gray-100'>
              <button
                onClick={() => { navigate('/login'); setShowMenu(false) }}
                className='w-full btn-primary text-sm py-3'
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar