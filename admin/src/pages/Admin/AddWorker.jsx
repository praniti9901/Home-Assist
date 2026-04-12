import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddWorker = () => {

    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('Painter')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl } = useContext(AppContext)
    const { aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {

            if (!docImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData();

            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    return (
        <form onSubmit={onSubmitHandler} className='p-6 w-full max-w-4xl'>

            <p className='mb-6 font-bold text-gray-800 text-2xl'>Add Worker</p>

            <div className='bg-white px-8 py-8 border border-gray-100 shadow-sm rounded-2xl w-full max-h-[80vh] overflow-y-scroll'>
                <div className='flex items-center gap-5 mb-10'>
                    <label htmlFor="doc-img" className='relative group cursor-pointer'>
                        <img 
                          className='w-24 h-24 rounded-2xl object-cover bg-gray-100 border border-gray-200 group-hover:opacity-75 transition-opacity' 
                          src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} 
                          alt="" 
                        />
                        <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden accept="image/*" />
                    <div>
                      <p className='font-semibold text-gray-800 text-lg'>Upload Photo</p>
                      <p className='text-sm text-gray-500'>Square image recommended (JPG, PNG)</p>
                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6 text-gray-700'>

                    {/* Left Column */}
                    <div className='flex flex-col gap-6'>
                        <div>
                            <p className='text-sm font-semibold mb-1'>Worker Name <span className='text-red-500'>*</span></p>
                            <input onChange={e => setName(e.target.value)} value={name} className='form-input' type="text" placeholder='e.g. John Doe' required />
                        </div>

                        <div>
                            <p className='text-sm font-semibold mb-1'>Email Address <span className='text-red-500'>*</span></p>
                            <input onChange={e => setEmail(e.target.value)} value={email} className='form-input' type="email" placeholder='john@example.com' required />
                        </div>

                        <div>
                            <p className='text-sm font-semibold mb-1'>Password <span className='text-red-500'>*</span></p>
                            <input onChange={e => setPassword(e.target.value)} value={password} className='form-input' type="password" placeholder='Create a password' required />
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <p className='text-sm font-semibold mb-1'>Experience</p>
                                <select onChange={e => setExperience(e.target.value)} value={experience} className='form-input cursor-pointer'>
                                    <option value="1 Year">1 Year</option>
                                    <option value="2 Year">2 Years</option>
                                    <option value="3 Year">3 Years</option>
                                    <option value="4 Year">4 Years</option>
                                    <option value="5 Year">5 Years</option>
                                    <option value="6 Year">6 Years</option>
                                    <option value="8 Year">8 Years</option>
                                    <option value="9 Year">9 Years</option>
                                    <option value="10 Year">10+ Years</option>
                                </select>
                            </div>
                            <div>
                                <p className='text-sm font-semibold mb-1'>Service Fee <span className='text-red-500'>*</span></p>
                                <input onChange={e => setFees(e.target.value)} value={fees} className='form-input' type="number" placeholder='e.g. 500' required />
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className='flex flex-col gap-6'>
                        <div>
                            <p className='text-sm font-semibold mb-1'>Speciality Category</p>
                            <select onChange={e => setSpeciality(e.target.value)} value={speciality} className='form-input cursor-pointer'>
                                <option value="Plumber">Plumber</option>
                                <option value="House Cleaner">House Cleaner</option>
                                <option value="Electrician">Electrician</option>
                                <option value="Painter">Painter</option>
                                <option value="Gardener">Gardener</option>
                                <option value="Pest Control">Pest Control</option>
                                <option value="Cooking">Cooking</option>
                                <option value="Appliance Repair">Appliance Repair</option>
                            </select>
                        </div>

                        <div>
                            <p className='text-sm font-semibold mb-1'>Address Line 1 <span className='text-red-500'>*</span></p>
                            <input onChange={e => setAddress1(e.target.value)} value={address1} className='form-input mb-3' type="text" placeholder='Street address, P.O. box, etc.' required />
                            
                            <p className='text-sm font-semibold mb-1'>Address Line 2 <span className='text-red-500'>*</span></p>
                            <input onChange={e => setAddress2(e.target.value)} value={address2} className='form-input' type="text" placeholder='Apartment, suite, unit, etc.' required />
                        </div>
                    </div>

                </div>

                <div className='mt-8'>
                    <p className='text-sm font-semibold mb-1'>About Worker</p>
                    <textarea 
                      onChange={e => setAbout(e.target.value)} 
                      value={about} 
                      className='form-input resize-y min-h-[100px]' 
                      placeholder='Write a short bio about the worker...'
                    ></textarea>
                </div>

                <button type='submit' className='btn-primary w-full sm:w-auto mt-8 shadow-green-200 shadow-md'>
                  Add Worker
                </button>

            </div>
        </form>
    )
}

export default AddWorker