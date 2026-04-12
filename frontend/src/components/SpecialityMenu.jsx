import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <section className='py-14' id='speciality'>

      {/* Section header */}
      <div className='text-center mb-10'>
        <span className='inline-block text-primary text-xs font-semibold tracking-wider uppercase bg-primary/10 px-4 py-1.5 rounded-full mb-3'>
          Our Services
        </span>
        <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>
          Find by Category
        </h2>
        <p className='text-gray-400 text-sm max-w-xs mx-auto leading-relaxed'>
          Browse trusted specialists and book hassle-free in seconds.
        </p>
      </div>

      {/* Responsive grid — wraps on small, scrolls on tiny */}
      <div className='flex flex-wrap justify-center gap-4 sm:gap-6'>
        {specialityData.map((item, index) => (
          <Link
            to={`/workers/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            key={index}
            className='group flex flex-col items-center gap-3 cursor-pointer w-[90px] sm:w-[110px]'
          >
            {/* Square icon tile */}
            <div className='w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/5 group-hover:-translate-y-2 group-hover:shadow-md group-hover:shadow-green-100'>
              <img
                className='w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] object-contain transition-transform duration-300 group-hover:scale-110'
                src={item.image}
                alt={item.speciality}
              />
            </div>

            {/* Label */}
            <p className='text-xs sm:text-sm font-medium text-gray-600 text-center leading-snug group-hover:text-primary transition-colors duration-200'>
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default SpecialityMenu