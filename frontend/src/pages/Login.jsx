import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Account created successfully!')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Welcome back!')
        } else {
          toast.error(data.message)
        }
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) navigate('/')
  }, [token])

  return (
    <div className='min-h-[85vh] flex items-center justify-center py-10 px-4'>
      <div className='w-full max-w-md'>
        {/* Card */}
        <div className='bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden'>
          {/* Top green bar */}
          <div className='h-1.5 w-full bg-gradient-to-r from-primary to-emerald-400' />

          <div className='p-8 sm:p-10'>
            {/* Header */}
            <div className='text-center mb-8'>
              <div className='w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4'>
                <svg className='w-7 h-7 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                </svg>
              </div>
              <h1 className='text-2xl font-bold text-gray-800'>
                {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
              </h1>
              <p className='text-gray-400 text-sm mt-1.5'>
                {state === 'Sign Up' ? 'Sign up to book home services' : 'Log in to your account'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmitHandler} className='flex flex-col gap-5'>
              {state === 'Sign Up' && (
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className='form-input'
                    type='text'
                    placeholder='John Doe'
                    required
                  />
                </div>
              )}

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Email Address</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className='form-input'
                  type='email'
                  placeholder='you@email.com'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                <div className='relative'>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className='form-input pr-10'
                    type={showPass ? 'text' : 'password'}
                    placeholder='••••••••'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPass(!showPass)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors mt-0.5'
                  >
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      {showPass
                        ? <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' />
                        : <><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' /></>
                      }
                    </svg>
                  </button>
                </div>
              </div>

              <button
                type='submit'
                disabled={loading}
                className='w-full btn-primary py-3.5 text-sm font-semibold flex items-center justify-center gap-2 mt-1 disabled:opacity-70 disabled:cursor-not-allowed'
              >
                {loading
                  ? <><div className='w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin' /> Processing...</>
                  : state === 'Sign Up' ? 'Create Account' : 'Sign In'
                }
              </button>

              {/* Switch state */}
              <p className='text-center text-gray-400 text-sm'>
                {state === 'Sign Up'
                  ? <>Already have an account?{' '}
                    <button type='button' onClick={() => setState('Login')} className='text-primary font-medium hover:underline'>Log in</button>
                  </>
                  : <>Don't have an account?{' '}
                    <button type='button' onClick={() => setState('Sign Up')} className='text-primary font-medium hover:underline'>Sign up</button>
                  </>
                }
              </p>
            </form>
          </div>
        </div>

        {/* Trust badges */}
        <div className='flex items-center justify-center gap-6 mt-6'>
          {['Secure Login', 'No Spam', 'Free Account'].map((badge) => (
            <div key={badge} className='flex items-center gap-1.5 text-gray-400 text-xs'>
              <svg className='w-3.5 h-3.5 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M5 13l4 4L19 7' />
              </svg>
              {badge}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Login