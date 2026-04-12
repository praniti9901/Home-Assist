import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const RelatedWorkers = ({ speciality, docId }) => {
  const navigate = useNavigate()
  const { workers } = useContext(AppContext)
  const [relDoc, setRelDoc] = useState([])

  useEffect(() => {
    if (workers.length > 0 && speciality) {
      const workersData = workers.filter((doc) => doc.speciality === speciality && doc._id !== docId)
      setRelDoc(workersData)
    }
  }, [workers, speciality, docId])

  if (relDoc.length === 0) return null

  return (
    <section className='py-16'>
      <div className='text-center mb-10'>
        <span className='inline-block text-primary text-xs font-semibold tracking-wider uppercase bg-primary/10 px-4 py-1.5 rounded-full mb-4'>
          More Like This
        </span>
        <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-2'>
          Related Service Providers
        </h2>
        <p className='text-gray-400 text-sm max-w-xs mx-auto'>
          Other verified experts in the same category.
        </p>
      </div>

      <div className='grid grid-cols-auto gap-5'>
        {relDoc.slice(0, 6).map((item, index) => (
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
    </section>
  )
}

export default RelatedWorkers