import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Workers = () => {

  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

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
    <div>
      <p className='text-gray-600'>Browse through the service providers specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button onClick={() => setShowFilter(!showFilter)} className={`py-1 px-3 border rounded text-sm  transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => speciality === 'Plumber' ? navigate('/workers') : navigate('/workers/Plumber')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Plumber' ? 'bg-indigo-100 text-black ' : ''}`}>Plumber</p>
          <p onClick={() => speciality === 'House Cleaner' ? navigate('/workers') : navigate('/workers/House Cleaner')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'House Cleaner' ? 'bg-indigo-100 text-black ' : ''}`}>House Cleaner</p>
          <p onClick={() => speciality === 'Electrician' ? navigate('/workers') : navigate('/workers/Electrician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Electrician' ? 'bg-indigo-100 text-black ' : ''}`}>Electrician</p>
          <p onClick={() => speciality === 'Painter' ? navigate('/workers') : navigate('/workers/Painter')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Painter' ? 'bg-indigo-100 text-black ' : ''}`}>Painter</p>
          <p onClick={() => speciality === 'Gardener' ? navigate('/workers') : navigate('/workers/Gardener')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gardener' ? 'bg-indigo-100 text-black ' : ''}`}>Gardener</p>
          <p onClick={() => speciality === 'Pest Control' ? navigate('/workers') : navigate('/workers/Pest Control')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Pest Control' ? 'bg-indigo-100 text-black ' : ''}`}>Pest Control</p>
          <p onClick={() => speciality === 'Cooking' ? navigate('/workers') : navigate('/workers/Cooking')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Cooking' ? 'bg-indigo-100 text-black ' : ''}`}>Cooking</p>
          <p onClick={() => speciality === 'Appliance Repair' ? navigate('/workers') : navigate('/workers/Appliance Repair')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Appliance Repair' ? 'bg-indigo-100 text-black ' : ''}`}>Appliance Repair</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterDoc.map((item, index) => (
            <div onClick={() => { navigate(`/booking/${item._id}`); window.scrollTo(0, 0) }} className='border border-indigo-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
              <img className='bg-indigo-50' src={item.image} alt="" />
              <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                  <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                </div>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Workers