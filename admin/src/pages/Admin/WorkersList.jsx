import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const WorkersList = () => {

  const { doctors, changeAvailability , aToken , getAllDoctors} = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
        getAllDoctors()
    }
  }, [aToken])

  return (
    <div className='p-6 w-full'>
      <h1 className='text-2xl font-bold text-gray-800 mb-6'>All Workers</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
        {doctors.map((item, index) => (
          <div className='bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 group' key={index}>
            <div className='aspect-square overflow-hidden bg-gradient-to-br from-emerald-50 to-green-100'>
              <img className='w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105' src={item.image} alt="" />
            </div>
            
            <div className='p-5'>
              <p className='text-gray-800 text-lg font-bold truncate'>{item.name}</p>
              <p className='text-primary text-sm font-medium mt-0.5'>{item.speciality}</p>
              
              <div className='mt-4 flex items-center gap-2'>
                <label className="relative flex items-center cursor-pointer">
                  <input 
                    onChange={() => changeAvailability(item._id)} 
                    type="checkbox" 
                    checked={item.available} 
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
                <span className={`text-sm font-semibold ${item.available ? 'text-primary' : 'text-gray-400'}`}>
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkersList