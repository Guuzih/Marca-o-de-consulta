"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointmentPDF = exports.deleteAppointment = exports.updateAppointment = exports.getAppointments = exports.createAppointment = void 0;
const database_1 = require("../config/database");
const Appointment_1 = require("../models/Appointment");
const User_1 = require("../models/User");
const pdfGenerator_1 = require("../utils/pdfGenerator");
const path_1 = __importDefault(require("path"));
const errorMiddleware_1 = require("../middlewares/errorMiddleware");
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, date } = req.body;
    try {
        const appointmentRepository = database_1.AppDataSource.getRepository(Appointment_1.Appointment);
        const userRepository = database_1.AppDataSource.getRepository(User_1.User);
        const userId = typeof req.user.id === 'string' ? parseInt(req.user.id, 10) : req.user.id;
        const user = yield userRepository.findOneBy({
            id: userId
        });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        const appointment = appointmentRepository.create({ title, description, date, status: 'scheduled', user });
        yield appointmentRepository.save(appointment);
        yield (0, pdfGenerator_1.generatePDF)(appointment);
        res.status(201).json(appointment);
    }
    catch (error) {
        res.status(500).json({ message: errorMiddleware_1.errorHandler });
    }
});
exports.createAppointment = createAppointment;
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentRepository = database_1.AppDataSource.getRepository(Appointment_1.Appointment);
        const userId = typeof req.user.id === 'string' ? parseInt(req.user.id, 10) : req.user.id;
        const appointments = yield appointmentRepository.find({ where: { user: { id: userId } } });
        res.json(appointments);
    }
    catch (error) {
        res.status(500).json({ message: errorMiddleware_1.errorHandler });
    }
});
exports.getAppointments = getAppointments;
const updateAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, date, status } = req.body;
    try {
        const appointmentRepository = database_1.AppDataSource.getRepository(Appointment_1.Appointment);
        const userId = typeof req.user.id === 'string' ? parseInt(req.user.id, 10) : req.user.id;
        const appointment = yield appointmentRepository.findOneBy({ id: Number(id), user: { id: userId } });
        if (!appointment)
            return res.status(404).json({ message: 'Appointment not found' });
        appointment.title = title || appointment.title;
        appointment.description = description || appointment.description;
        appointment.date = date || appointment.date;
        appointment.status = status || appointment.status;
        yield appointmentRepository.save(appointment);
        res.json(appointment);
    }
    catch (error) {
        res.status(500).json({ message: errorMiddleware_1.errorHandler });
    }
});
exports.updateAppointment = updateAppointment;
const deleteAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const appointmentRepository = database_1.AppDataSource.getRepository(Appointment_1.Appointment);
        const userId = typeof req.user.id === 'string' ? parseInt(req.user.id, 10) : req.user.id;
        const appointment = yield appointmentRepository.findOneBy({ id: Number(id), user: { id: userId } });
        if (!appointment)
            return res.status(404).json({ message: 'Appointment not found' });
        yield appointmentRepository.remove(appointment);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: errorMiddleware_1.errorHandler });
    }
});
exports.deleteAppointment = deleteAppointment;
const getAppointmentPDF = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const appointmentRepository = database_1.AppDataSource.getRepository(Appointment_1.Appointment);
        const userId = typeof req.user.id === 'string' ? parseInt(req.user.id, 10) : req.user.id;
        const appointment = yield appointmentRepository.findOneBy({ id: Number(id), user: { id: userId } });
        if (!appointment)
            return res.status(404).json({ message: 'Appointment not found' });
        const filePath = path_1.default.join(__dirname, `../../pdfs/appointment_${appointment.id}.pdf`);
        res.sendFile(filePath);
    }
    catch (error) {
        res.status(500).json({ message: errorMiddleware_1.errorHandler });
    }
});
exports.getAppointmentPDF = getAppointmentPDF;
