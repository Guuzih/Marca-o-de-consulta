
import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Appointment } from '../models/Appointment';
import { User } from '../models/User';
import { generatePDF } from '../utils/pdfGenerator';
import path from 'path';
import { errorHandler } from '../middlewares/errorMiddleware';



export const createAppointment = async (req: Request, res: Response) => {
    const { title, description, date } = req.body;
    try {
        const appointmentRepository = AppDataSource.getRepository(Appointment);
        const userRepository = AppDataSource.getRepository(User);
        const userId = typeof req.user.id === 'string' ? parseInt(req.user.id, 10) : req.user.id;
        const user = await userRepository.findOneBy({
            id: userId


        });

        if (!user) return res.status(404).json({ message: 'User not found' });

        const appointment = appointmentRepository.create({ title, description, date, status: 'scheduled', user });
        await appointmentRepository.save(appointment);

        await generatePDF(appointment);

        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: errorHandler });
    }
};

export const getAppointments = async (req: Request, res: Response) => {
    try {
        const appointmentRepository = AppDataSource.getRepository(Appointment);
        const userId = typeof req.user.id === 'string' ? parseInt(req.user.id, 10) : req.user.id;
        const appointments = await appointmentRepository.find({ where: { user: { id: userId } } });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: errorHandler });
    }
};

export const updateAppointment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, date, status } = req.body;
    try {
        const appointmentRepository = AppDataSource.getRepository(Appointment);
        const userId = typeof req.user.id === 'string' ? parseInt(req.user.id, 10) : req.user.id;
        const appointment = await appointmentRepository.findOneBy({ id: Number(id), user: { id: userId } });

        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        appointment.title = title || appointment.title;
        appointment.description = description || appointment.description;
        appointment.date = date || appointment.date;
        appointment.status = status || appointment.status;

        await appointmentRepository.save(appointment);
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: errorHandler });
    }
};

export const deleteAppointment = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const appointmentRepository = AppDataSource.getRepository(Appointment);
        const userId = typeof req.user.id === 'string' ? parseInt(req.user.id, 10) : req.user.id;
        const appointment = await appointmentRepository.findOneBy({ id: Number(id), user: { id: userId } });

        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        await appointmentRepository.remove(appointment);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: errorHandler });
    }
};

export const getAppointmentPDF = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const appointmentRepository = AppDataSource.getRepository(Appointment);
        const userId = typeof req.user.id === 'string' ? parseInt(req.user.id, 10) : req.user.id;
        const appointment = await appointmentRepository.findOneBy({ id: Number(id), user: { id: userId } });

        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        const filePath = path.join(__dirname, `../../pdfs/appointment_${appointment.id}.pdf`);
        res.sendFile(filePath);
    } catch (error) {
        res.status(500).json({ message: errorHandler });
    }
};
