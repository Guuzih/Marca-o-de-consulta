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
exports.generatePDF = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const dir = './pdfs';
if (!fs_1.default.existsSync(dir)) {
    fs_1.default.mkdirSync(dir);
}
const generatePDF = (appointment) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = new pdfkit_1.default();
    const fileName = `appointment_${appointment.id}.pdf`;
    doc.pipe(fs_1.default.createWriteStream(`./pdfs/${fileName}`));
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
});
exports.generatePDF = generatePDF;
