
import { Router } from 'express';
import { createAppointment, getAppointments, updateAppointment, deleteAppointment, getAppointmentPDF } from '../controllers/appointmentController';
import { auth } from '../middlewares/authMiddleware';

const router = Router();

router.post('/appointments', auth, createAppointment);
router.get('/appointments', auth, getAppointments);
router.put('/appointments/:id', auth, updateAppointment);
router.delete('/appointments/:id', auth, deleteAppointment);
router.get('/appointments/:id/pdf', auth, getAppointmentPDF);

export default router;
