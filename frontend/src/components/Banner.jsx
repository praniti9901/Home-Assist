import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <div className='relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 my-20 mx-0 md:mx-0'>
      {/* Decorative circles */}
      <div className='absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none' />
      <div className='absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none' />

      <div className='relative flex flex-col md:flex-row items-center'>
        {/* Left Content */}
        <div className='flex-1 px-8 sm:px-12 lg:px-16 py-14 lg:py-20'>
          <div className='inline-flex items-center gap-2 bg-primary/20 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm border border-primary/30'>
            <span className='w-1.5 h-1.5 bg-primary rounded-full animate-pulse' />
            50+ Verified Experts Ready
          </div>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight'>
            Book Home Services <br />
            <span className='text-primary'>Anytime, Anywhere</span>
          </h2>
          <p className='text-gray-300 text-sm mb-8 max-w-md leading-relaxed'>
            Join thousands of happy homeowners. Get instant access to verified professionals for all your home needs.
          </p>
          <div className='flex flex-col sm:flex-row gap-3'>
            <button
              onClick={() => { navigate('/login'); scrollTo(0, 0) }}
              className='flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-full hover:bg-primary-dark hover:shadow-lg hover:shadow-green-900/40 hover:scale-105 transition-all duration-300 text-sm'
            >
              Get Started Free
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
              </svg>
            </button>
            <button
              onClick={() => navigate('/workers')}
              className='flex items-center justify-center gap-2 border border-gray-600 text-gray-300 font-medium px-8 py-4 rounded-full hover:border-primary hover:text-primary transition-all duration-300 text-sm'
            >
              Explore Services
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className='hidden md:block md:w-2/5 lg:w-[380px] relative self-end'>
          <img
            className='w-full max-w-xs lg:max-w-sm object-contain ml-auto'
            src={assets.drilling_machine}
            alt='Home service professional'
          />
        </div>
      </div>
    </div>
  )
}

export default Banner