import PDFDocument from 'pdfkit';
import { Appointment } from '../models/Appointment';
import fs from 'fs';
import { join } from 'path';

export const generatePDF = async (appointment: Appointment) => {
    const doc = new PDFDocument();
    const fileName = `appointment_${appointment.id}.pdf`;

    const tempDir = '/tmp/pdfs';
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }
    const filePath = join(tempDir, fileName);

    doc.pipe(fs.createWriteStream(filePath));

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

    return filePath;
};
