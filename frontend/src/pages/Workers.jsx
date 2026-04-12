import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const specialityList = [
  'Plumber', 'House Cleaner', 'Electrician', 'Painter',
  'Gardener', 'Pest Control', 'Cooking', 'Appliance Repair'
]

const Workers = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const { workers } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(workers.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(workers)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [workers, speciality])

  return (
    <div className='py-6'>
      {/* Page header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>
          {speciality ? speciality : 'All Service Providers'}
        </h1>
        <p className='text-gray-400 text-sm'>
          {filterDoc.length} verified expert{filterDoc.length !== 1 ? 's' : ''} available
          {speciality ? ` for ${speciality}` : ''}
        </p>
      </div>

      <div className='flex flex-col sm:flex-row items-start gap-6'>
        {/* Filter sidebar */}
        <div className='w-full sm:w-auto'>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`sm:hidden flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl border transition-all duration-200 mb-4 ${showFilter ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-600 bg-white'}`}
          >
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z' />
            </svg>
            {showFilter ? 'Hide Filters' : 'Filter'}
          </button>

          {/* Sidebar filter list */}
          <div className={`flex flex-col gap-2 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
            <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 px-1'>Category</p>
            {specialityList.map((cat) => (
              <button
                key={cat}
                onClick={() => cat === speciality ? navigate('/workers') : navigate(`/workers/${cat}`)}
                className={`w-full sm:w-52 text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                  speciality === cat
                    ? 'bg-primary text-white border-primary shadow-md shadow-green-200'
                    : 'border-gray-100 text-gray-600 bg-white hover:bg-green-50 hover:border-primary/30 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
            {speciality && (
              <button
                onClick={() => navigate('/workers')}
                className='text-left px-4 py-2 text-xs text-gray-400 hover:text-red-500 transition-colors mt-1'
              >
                ✕ Clear filter
              </button>
            )}
          </div>
        </div>

        {/* Worker grid */}
        <div className='flex-1 w-full'>
          {filterDoc.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-20 text-center'>
              <div className='w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4'>
                <svg className='w-8 h-8 text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' />
                </svg>
              </div>
              <p className='text-gray-500 font-medium'>No experts found</p>
              <p className='text-gray-300 text-sm mt-1'>Try a different category</p>
            </div>
          ) : (
            <div className='grid grid-cols-auto gap-5'>
              {filterDoc.map((item, index) => (
                <div
                  key={index}
                  onClick={() => { navigate(`/booking/${item._id}`); window.scrollTo(0, 0) }}
                  className='worker-card group'
                >
                  <div className='overflow-hidden bg-gradient-to-br from-emerald-50 to-green-100 aspect-[4/3]'>
                    <img
                      className='w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105'
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <div className='p-4'>
                    <div className='badge-available mb-2'>
                      <span className='w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse' />
                      Available
                    </div>
                    <p className='text-gray-800 font-semibold text-base mb-1'>{item.name}</p>
                    <p className='text-gray-400 text-xs'>{item.speciality}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Workers