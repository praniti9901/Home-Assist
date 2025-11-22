import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to HomeAssist, your trusted platform for connecting households with skilled professionals for all your home service needs. Whether it's cleaning, repairs, maintenance, or specialized home improvement tasks, we ensure that you find the right expert for the job.</p>
          <p>At HomeAssist, we believe in creating a community of trust, where users can find reliable home services with ease. Join us in making home maintenance simple, efficient, and stress-free!<br/>
             Let HomeAssist handle your home service needs today!</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>At HomeAssist, our mission is to simplify home services by providing a seamless, reliable, and efficient platform where users can book verified professionals with confidence. We strive to bring convenience, quality, and trust to every home.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY  <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Verified Experts:</b>
          <p>We partner with experienced and background-checked professionals.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b> Easy & Hassle-Free Booking: </b>
          <p>No more endless calls or unreliable contractors! With HomeAssist, you can book services in just a few clicks and get matched with the right expert instantly.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Quick Response & Efficient Service:</b>
          <p >Need urgent help? Our platform connects you with nearby available professionals for fast and efficient service, ensuring your needs are met on time.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Dedicated Customer Support:</b>
          <p>Got a question or an issue? Our support team is always ready to assist you, ensuring a smooth and satisfying experience from start to finish.</p>
        </div>
      </div>

    </div>
  )
}

export default About
