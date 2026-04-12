import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const WorkerCard = ({ item, onClick }) => (
  <div
    onClick={onClick}
    className='worker-card group cursor-pointer'
  >
    {/* Image container — fixed aspect ratio */}
    <div className='overflow-hidden bg-gradient-to-br from-emerald-50 to-green-100 aspect-[4/3]'>
      <img
        className='w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105'
        src={item.image}
        alt={item.name}
      />
    </div>

    {/* Info */}
    <div className='p-4'>
      <div className='badge-available mb-2'>
        <span className='w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse flex-shrink-0' />
        Available
      </div>
      <p className='text-gray-800 font-semibold text-sm sm:text-base mb-0.5 truncate'>{item.name}</p>
      <p className='text-gray-400 text-xs truncate'>{item.speciality}</p>
    </div>
  </div>
)

const TopWorkers = () => {
  const navigate = useNavigate()
  const { workers } = useContext(AppContext)

  return (
    <section className='py-14'>

      {/* Section header */}
      <div className='text-center mb-8'>
        <span className='inline-block text-primary text-xs font-semibold tracking-wider uppercase bg-primary/10 px-4 py-1.5 rounded-full mb-3'>
          Top Rated
        </span>
        <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>
          Featured Experts
        </h2>
        <p className='text-gray-400 text-sm max-w-xs mx-auto'>
          Our highest-rated and most-booked professionals.
        </p>
      </div>

      {/* Worker grid — 2 on mobile, 3 on md, 4 on lg */}
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5'>
        {workers.slice(0, 8).map((item, index) => (
          <WorkerCard
            key={index}
            item={item}
            onClick={() => navigate(`/booking/${item._id}`)}
          />
        ))}
      </div>

      {/* CTA */}
      <div className='text-center mt-8'>
        <button
          onClick={() => { navigate('/workers'); scrollTo(0, 0) }}
          className='btn-outline text-sm'
        >
          Browse All Experts →
        </button>
      </div>
    </section>
  )
}

export default TopWorkers