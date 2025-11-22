import React, { useContext } from 'react'
import { WorkerContext } from './context/WorkerContext';
import { AdminContext } from './context/AdminContext';
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddWorker from './pages/Admin/AddWorker';
import WorkersList from './pages/Admin/WorkersList';
import Login from './pages/Login';
import WorkerAppointments from './pages/Worker/WorkerAppointments';
import WorkerDashboard from './pages/Worker/WorkerDashboard';
import WorkerProfile from './pages/Worker/WorkerProfile';

const App = () => {

  const { dToken } = useContext(WorkerContext)
  const { aToken } = useContext(AdminContext)

  return dToken || aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-worker' element={<AddWorker />} />
          <Route path='/worker-list' element={<WorkersList />} />
          <Route path='/worker-dashboard' element={<WorkerDashboard />} />
          <Route path='/worker-appointments' element={<WorkerAppointments />} />
          <Route path='/worker-profile' element={<WorkerProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  )
}

export default App