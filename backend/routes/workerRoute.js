import express from 'express';
import { loginDoctor, appointmentsDoctor, appointmentCancel, doctorList, changeAvailablity, appointmentComplete, doctorDashboard, doctorProfile, updateDoctorProfile } from '../controllers/workerController.js';
import authWorker from '../middleware/authWorker.js';
const workerRouter = express.Router();

workerRouter.post("/login", loginDoctor)
workerRouter.post("/cancel-appointment", authWorker, appointmentCancel)
workerRouter.get("/appointments", authWorker, appointmentsDoctor)
workerRouter.get("/list", doctorList)
workerRouter.post("/change-availability", authWorker, changeAvailablity)
workerRouter.post("/complete-appointment", authWorker, appointmentComplete)
workerRouter.get("/dashboard", authWorker, doctorDashboard)
workerRouter.get("/profile", authWorker, doctorProfile)
workerRouter.post("/update-profile", authWorker, updateDoctorProfile)

export default workerRouter;