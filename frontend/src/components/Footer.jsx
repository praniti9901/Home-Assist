import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate, NavLink } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  const links = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Our Services', to: '/workers' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Privacy Policy', to: '/' },
  ]

  return (
    <footer className='mt-24 border-t border-gray-100'>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-10 py-14'>
        {/* Brand */}
        <div className='sm:col-span-1'>
          <img className='mb-5 w-36' src={assets.logo} alt='HomeAssist' />
          <p className='text-gray-400 text-sm leading-7 max-w-xs'>
            Your trusted platform connecting households with skilled home service professionals. Book with confidence.
          </p>
          <div className='flex gap-3 mt-5'>
            {/* Social icons */}
            {['facebook', 'twitter', 'instagram'].map((platform) => (
              <a
                key={platform}
                href='#'
                className='w-9 h-9 rounded-full bg-gray-100 hover:bg-primary hover:text-white text-gray-500 flex items-center justify-center transition-all duration-300 text-xs font-bold'
              >
                {platform[0].toUpperCase()}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <p className='text-gray-800 font-semibold text-sm mb-5 uppercase tracking-wider'>Quick Links</p>
          <ul className='flex flex-col gap-3'>
            {links.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  className='text-gray-400 text-sm hover:text-primary transition-colors flex items-center gap-1.5 group'
                >
                  <svg className='w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M9 5l7 7-7 7' />
                  </svg>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className='text-gray-800 font-semibold text-sm mb-5 uppercase tracking-wider'>Get In Touch</p>
          <ul className='flex flex-col gap-3'>
            <li className='flex items-start gap-2 text-gray-400 text-sm'>
              <svg className='w-4 h-4 text-primary mt-0.5 shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
              </svg>
              Ganesh Mala, 230, Pune, Maharashtra
            </li>
            <li className='flex items-center gap-2 text-gray-400 text-sm'>
              <svg className='w-4 h-4 text-primary shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
              </svg>
              +91 98989 89800
            </li>
            <li className='flex items-center gap-2 text-gray-400 text-sm'>
              <svg className='w-4 h-4 text-primary shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
              </svg>
              homeassist01@gmail.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='border-t border-gray-100 py-5 flex flex-col sm:flex-row items-center justify-between gap-3'>
        <p className='text-gray-400 text-xs'>© 2025 HomeAssist. All rights reserved.</p>
        <p className='text-gray-400 text-xs'>Made with ❤️ in India</p>
      </div>
    </footer>
  )
}

export default Footer