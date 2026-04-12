import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='py-8'>
      {/* Page title */}
      <div className='text-center mb-14'>
        <span className='inline-block text-primary text-xs font-semibold tracking-wider uppercase bg-primary/10 px-4 py-1.5 rounded-full mb-4'>
          Reach Out
        </span>
        <h1 className='text-4xl font-bold text-gray-800'>
          Contact <span className='gradient-text'>Us</span>
        </h1>
        <p className='text-gray-400 text-sm mt-3 max-w-sm mx-auto'>
          Have a question or need support? We're here to help you 7 days a week.
        </p>
      </div>

      {/* Main content */}
      <div className='flex flex-col md:flex-row gap-12 items-start mb-20'>
        {/* Image */}
        <div className='md:w-5/12'>
          <img
            className='w-full rounded-3xl shadow-lg object-cover'
            src={assets.contact}
            alt='Contact HomeAssist'
          />
        </div>

        {/* Info */}
        <div className='md:w-7/12 flex flex-col gap-8'>
          {/* Office */}
          <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-7'>
            <div className='flex items-center gap-3 mb-5'>
              <div className='w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary'>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' />
                </svg>
              </div>
              <h2 className='font-bold text-gray-800 text-lg'>Our Office</h2>
            </div>
            <div className='flex flex-col gap-4'>
              <div className='flex items-start gap-3'>
                <svg className='w-4 h-4 text-primary mt-0.5 shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                <p className='text-gray-500 text-sm leading-6'>Ganesh Mala, 230,<br/>Pune, Maharashtra — 411001</p>
              </div>
              <div className='flex items-center gap-3'>
                <svg className='w-4 h-4 text-primary shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                </svg>
                <p className='text-gray-500 text-sm'>+91 98989 89800</p>
              </div>
              <div className='flex items-center gap-3'>
                <svg className='w-4 h-4 text-primary shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                </svg>
                <a href='mailto:homeassist01@gmail.com' className='text-primary text-sm hover:underline'>
                  homeassist01@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Careers */}
          <div className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-7 relative overflow-hidden'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2' />
            <div className='relative'>
              <span className='inline-block text-primary text-xs font-semibold bg-primary/20 px-3 py-1 rounded-full mb-4'>
                We're Hiring
              </span>
              <h3 className='text-white font-bold text-xl mb-2'>Careers at HomeAssist</h3>
              <p className='text-gray-400 text-sm leading-6 mb-6'>
                Join our growing team and help us shape the future of home services. Explore open roles across engineering, design, and operations.
              </p>
              <button className='flex items-center gap-2 bg-primary text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-primary-dark hover:shadow-lg hover:shadow-green-900/40 hover:scale-105 transition-all duration-300'>
                Explore Jobs
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
