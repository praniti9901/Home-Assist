import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-emerald-500 to-green-600 my-4'>

      {/* Background decoration */}
      <div className='absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none' />
      <div className='absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none' />

      <div className='relative flex flex-col md:flex-row md:items-stretch'>

        {/* ─── Left: Content ─── */}
        <div className='w-full md:w-[55%] flex flex-col justify-center gap-5 px-7 py-10 md:px-12 md:py-14 lg:px-16 lg:py-16'>

          {/* Trust badge */}
          <div className='inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full w-fit backdrop-blur-sm'>
            <span className='w-2 h-2 bg-white rounded-full animate-pulse flex-shrink-0' />
            Trusted by 10,000+ customers
          </div>

          {/* Headline */}
          <h1 className='text-3xl sm:text-4xl lg:text-5xl text-white font-bold leading-snug'>
            Book Home Services<br />
            <span className='text-white/80'>with Reliable Experts</span>
          </h1>

          {/* Description */}
          <p className='text-white/80 text-sm sm:text-base leading-relaxed max-w-md'>
            Browse our list of trusted professionals — plumbers, electricians, cleaners &amp; more. Schedule hassle-free in seconds.
          </p>

          {/* CTA row */}
          <div className='flex flex-wrap items-center gap-4'>
            <a
              href='#speciality'
              className='inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm'
            >
              Book a Service
              <svg className='w-4 h-4 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
              </svg>
            </a>
            <div className='flex items-center gap-2'>
              <img className='w-20 sm:w-24' src={assets.group_profiles} alt='customers' />
              <span className='text-white/70 text-xs'>+10k users</span>
            </div>
          </div>

          {/* Stats */}
          <div className='flex items-center gap-8 pt-1'>
            {[
              { value: '50+', label: 'Experts' },
              { value: '8', label: 'Services' },
              { value: '4.9★', label: 'Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className='text-white font-bold text-xl'>{stat.value}</p>
                <p className='text-white/60 text-xs mt-0.5'>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Right: Hero Image ─── */}
        <div className='w-full md:w-[45%] flex items-end justify-center overflow-hidden'>
          <img
            className='w-full max-h-[420px] object-cover object-center md:max-h-full md:h-full'
            src={assets.Banner}
            alt='Home services professionals'
          />
        </div>

      </div>
    </div>
  )
}

export default Header