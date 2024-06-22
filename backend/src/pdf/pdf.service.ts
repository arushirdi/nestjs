// src/pdf/pdf.service.ts

import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as PDFDocument from 'pdfkit';
import { User } from '../user/user.entity';

@Injectable()
export class PdfService {
  async generatePDF(users: User[]): Promise<string> {
    const pdfPath = path.join(__dirname, `../../generated-pdfs/users.pdf`);
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(pdfPath));
    doc.font('Helvetica').fontSize(20).text(`Users List\n\n`);

    users.forEach((user, index) => {
      doc.fontSize(14).text(`User ${index + 1}`);
      doc.text(`Name: ${user.name}`);
      doc.text(`Email: ${user.email}`);
      doc.text(`Phone: ${user.phone}`);
      doc.text(`Address: ${user.address}`);
      doc.text('\n');
    });

    doc.end();

    return pdfPath;
  }
}
