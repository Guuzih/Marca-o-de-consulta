"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentController_1 = require("../controllers/appointmentController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post('/appointments', authMiddleware_1.auth, appointmentController_1.createAppointment);
router.get('/appointments', authMiddleware_1.auth, appointmentController_1.getAppointments);
router.put('/appointments/:id', authMiddleware_1.auth, appointmentController_1.updateAppointment);
router.delete('/appointments/:id', authMiddleware_1.auth, appointmentController_1.deleteAppointment);
router.get('/appointments/:id/pdf', authMiddleware_1.auth, appointmentController_1.getAppointmentPDF);
exports.default = router;
