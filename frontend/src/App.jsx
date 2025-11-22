import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Workers from './pages/Workers'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/contact'
import Booking from './pages/Booking'
import MyBooking from './pages/MyBooking'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
//import WorkerFeedback from './pages/WorkerFeedback'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
       <ToastContainer />
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/workers' element={<Workers />} />
        <Route path='/workers/:speciality' element={<Workers />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/booking/:docId' element={<Booking />} />
        <Route path='/my-booking' element={<MyBooking />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App