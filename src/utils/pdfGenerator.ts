
import PDFDocument from 'pdfkit';
import { Appointment } from '../models/Appointment';
import fs from 'fs';

const dir = './pdfs';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

export const generatePDF = async (appointment: Appointment) => {
    const doc = new PDFDocument();
    const fileName = `appointment_${appointment.id}.pdf`;

    doc.pipe(fs.createWriteStream(`./pdfs/${fileName}`));

    doc.fontSize(25).text('Detalhes da Consulta', { align: 'center' });
    doc.moveDown();

    doc.fontSize(18).text(`Título: ${appointment.title}`);
    doc.moveDown();
    doc.fontSize(18).text(`Descrição: ${appointment.description}`);
    doc.moveDown();
    doc.fontSize(18).text(`Data: ${appointment.date}`);
    doc.moveDown();
    doc.fontSize(18).text(`Status: ${appointment.status}`);
    doc.moveDown();

    doc.end();
};
