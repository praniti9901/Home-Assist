import axios from 'axios'
import React, { useContext, useState } from 'react'
import { WorkerContext } from '../context/WorkerContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import backgroundImage from '../assets/bg.jpeg' 

const Login = () => {

  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const { setDToken } = useContext(WorkerContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Admin') {

      const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
      if (data.success) {
        setAToken(data.token)
        localStorage.setItem('aToken', data.token)
      } else {
        toast.error(data.message)
      }

    } else {

      const { data } = await axios.post(backendUrl + '/api/worker/login', { email, password })
      if (data.success) {
        setDToken(data.token)
        localStorage.setItem('dToken', data.token)
      } else {
        toast.error(data.message)
      }

    }

  }

  return (
    <form 
      onSubmit={onSubmitHandler} 
      className='min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark overlay for better readability on backgrounds */}
      <div className='absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0'></div>

      <div className='z-10 group bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden w-[90%] sm:w-[400px] border border-white/50'>
        {/* Top brand line */}
        <div className='h-2 w-full bg-gradient-to-r from-primary via-emerald-500 to-green-400'></div>
        
        <div className='p-8 sm:p-10 flex flex-col gap-5'>
          <div className='text-center mb-2'>
            <p className='text-xs font-bold tracking-widest text-primary uppercase mb-1'>HomeAssist Portal</p>
            <h1 className='text-3xl font-bold text-gray-800'>{state} Login</h1>
          </div>
          
          <div className='w-full'>
            <p className='text-sm font-semibold text-gray-600 mb-1 ml-1'>Email</p>
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
              className='form-input !bg-white/80' 
              type="email" 
              placeholder='Enter email'
              required 
            />
          </div>
          
          <div className='w-full'>
            <p className='text-sm font-semibold text-gray-600 mb-1 ml-1'>Password</p>
            <input 
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
              className='form-input !bg-white/80' 
              type="password" 
              placeholder='Enter password'
              required 
            />
          </div>
          
          <button className='btn-primary w-full py-3.5 mt-2 text-base font-bold shadow-lg shadow-green-200'>
            Sign in as {state}
          </button>
          
          <div className='text-center mt-2'>
            {state === 'Admin' ? (
              <p className='text-sm text-gray-500'>
                Worker Login? <span onClick={() => setState('Service Provider')} className='text-primary font-bold hover:underline cursor-pointer transition-all'>Click here</span>
              </p>
            ) : (
              <p className='text-sm text-gray-500'>
                Admin Login? <span onClick={() => setState('Admin')} className='text-primary font-bold hover:underline cursor-pointer transition-all'>Click here</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}

export default Login
