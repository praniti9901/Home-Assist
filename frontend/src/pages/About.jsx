import React from 'react'
import { assets } from '../assets/assets'

const whyChooseUs = [
  {
    icon: (
      <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
      </svg>
    ),
    title: 'Verified Experts',
    description: 'We partner with experienced, background-checked professionals you can trust.',
  },
  {
    icon: (
      <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
      </svg>
    ),
    title: 'Easy & Hassle-Free Booking',
    description: 'Book services in just a few clicks and get matched with the right expert instantly.',
  },
  {
    icon: (
      <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
      </svg>
    ),
    title: 'Quick Response',
    description: 'Connect with nearby professionals fast for urgent and efficient service delivery.',
  },
  {
    icon: (
      <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z' />
      </svg>
    ),
    title: 'Dedicated Support',
    description: 'Our team is always ready to assist, ensuring a smooth experience from start to finish.',
  },
]

const About = () => {
  return (
    <div className='py-8'>
      {/* Page title */}
      <div className='text-center mb-14'>
        <span className='inline-block text-primary text-xs font-semibold tracking-wider uppercase bg-primary/10 px-4 py-1.5 rounded-full mb-4'>
          Our Story
        </span>
        <h1 className='text-4xl font-bold text-gray-800'>About <span className='gradient-text'>HomeAssist</span></h1>
      </div>

      {/* About section */}
      <div className='flex flex-col md:flex-row gap-12 items-center mb-20'>
        <div className='md:w-5/12'>
          <div className='relative'>
            <img
              className='w-full rounded-3xl shadow-xl object-cover'
              src={assets.about_image}
              alt='About HomeAssist'
            />
            {/* Floating badge */}
            <div className='absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3'>
              <div className='w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary'>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                </svg>
              </div>
              <div>
                <p className='text-xs text-gray-400'>Trusted by</p>
                <p className='text-sm font-bold text-gray-800'>10,000+ Homes</p>
              </div>
            </div>
          </div>
        </div>

        <div className='md:w-7/12 flex flex-col gap-5'>
          <h2 className='text-2xl font-bold text-gray-800'>
            Simplifying Home Services Since 2020
          </h2>
          <p className='text-gray-500 text-sm leading-7'>
            Welcome to <strong className='text-gray-700'>HomeAssist</strong>, your trusted platform for connecting households with skilled professionals for all your home service needs. Whether it's cleaning, repairs, maintenance, or specialized home improvement tasks, we ensure that you find the right expert for the job.
          </p>
          <p className='text-gray-500 text-sm leading-7'>
            At HomeAssist, we believe in creating a community of trust, where users can find reliable home services with ease. Join us in making home maintenance simple, efficient, and stress-free!
          </p>

          {/* Mission card */}
          <div className='bg-gradient-to-br from-primary/10 to-emerald-50 border border-primary/20 rounded-2xl p-6 mt-2'>
            <div className='flex items-center gap-3 mb-3'>
              <div className='w-8 h-8 bg-primary/20 rounded-xl flex items-center justify-center text-primary'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                </svg>
              </div>
              <h3 className='font-bold text-gray-800'>Our Mission</h3>
            </div>
            <p className='text-gray-500 text-sm leading-6'>
              To simplify home services by providing a seamless, reliable platform where users can book verified professionals with confidence — bringing convenience, quality, and trust to every home.
            </p>
          </div>
        </div>
      </div>

      {/* Why choose us */}
      <div className='mb-16'>
        <div className='text-center mb-10'>
          <span className='inline-block text-primary text-xs font-semibold tracking-wider uppercase bg-primary/10 px-4 py-1.5 rounded-full mb-4'>
            Why Us
          </span>
          <h2 className='text-3xl font-bold text-gray-800'>Why Choose HomeAssist?</h2>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
          {whyChooseUs.map((item, index) => (
            <div
              key={index}
              className='group flex flex-col gap-4 p-7 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-pointer'
            >
              <div className='w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300'>
                {item.icon}
              </div>
              <div>
                <h3 className='font-semibold text-gray-800 mb-2 group-hover:text-primary transition-colors'>{item.title}</h3>
                <p className='text-gray-400 text-sm leading-6'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
