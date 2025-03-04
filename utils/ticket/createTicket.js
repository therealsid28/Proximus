import { asyncErrorHandler } from '../ErrorHandeling.js';
import fs from 'fs';
import path from 'path';
import { degrees, PDFDocument, rgb } from 'pdf-lib';
import { fileURLToPath } from 'url';
import AppError from '../AppError.js';

const createTicket = async ({ eventId }) => {
  try {
    // Load existing PDF

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const pdfPath = path.join(__dirname, 'ticket.pdf');
    const existingPdfBytes = fs.readFileSync(pdfPath);

    // Create a PDFDocument from the existing PDF
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const { width, height } = firstPage.getSize();

    // Add text to the PDF
    firstPage.drawText(`Live ${'Concert'}`, {
      x: 225,
      y: 180,
      size: 10,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(`Location`, {
      x: 438,
      y: 180,
      size: 10,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(`Concert`, {
      x: 240,
      y: height / 2,
      size: 60,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(`May 25`, {
      x: 238,
      y: 33,
      size: 13,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(`10:00 PM`, {
      x: 318,
      y: 33,
      size: 13,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(`Price: ${'$45'}`, {
      x: 408,
      y: 33,
      size: 13,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(`12`, {
      x: 582,
      y: 32,
      size: 15,
      color: rgb(0, 0, 0),
      rotate: degrees(90),
    });
    firstPage.drawText(`7`, {
      x: 582,
      y: 112 - 10,
      size: 15,
      color: rgb(0, 0, 0),
      rotate: degrees(90),
    });
    firstPage.drawText(`36`, {
      x: 582,
      y: 182 - 18,
      size: 15,
      color: rgb(0, 0, 0),
      rotate: degrees(90),
    });

    // Save modified PDF
    const modifiedPdfBytes = await pdfDoc.save();

    fs.writeFileSync('debug_ticket.pdf', Buffer.from(modifiedPdfBytes));

    return modifiedPdfBytes;
  } catch (error) {
    if (!error) {
      return next(new AppError('Error generating ticket', 500));
    }
  }
};

export { createTicket };
