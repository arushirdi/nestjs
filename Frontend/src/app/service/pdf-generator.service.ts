// pdf-generator.service.ts

import { Injectable } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';
import { UserService } from './user.service'; // Import UserService
import { User } from '../user'; // Assuming this is your User model

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor(private userService: UserService) { }

  async generatePDF(user: User): Promise<void> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    // Insert user data into the PDF
    page.drawText(`Name: ${user.name}`, {
      x: 50,
      y: height - 50,
      size: 15,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Email: ${user.email}`, {
      x: 50,
      y: height - 80,
      size: 15,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Phone: ${user.phone}`, {
      x: 50,
      y: height - 110,
      size: 15,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Address: ${user.address}`, {
      x: 50,
      y: height - 140,
      size: 15,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    this.downloadPDF(pdfBytes, `${user.name}_profile.pdf`);
  }


  async generatePDF2(): Promise<void> {
    try {
      const users = await this.userService.getAllUsers().toPromise(); // Fetch all users data

      if (!users || users.length === 0) {
        console.log('No users found');
        return;
      }

      const pdfDoc = await PDFDocument.create();
      const { height } = pdfDoc.addPage().getSize();
      let y = height - 50; // Starting Y position for text

      // Add user data to PDF
      users.forEach((currentUser, index) => { // Rename 'user' to 'currentUser' to avoid conflict
        if (index > 0) {
          pdfDoc.addPage(); // Add a new page for each user after the first
          y = height - 50; // Reset Y position for new page
        }

        // Insert user data into the PDF
        pdfDoc.getPages().forEach(page => {
          page.drawText(`User ${index + 1}`, {
            x: 50,
            y,
            size: 15,
            color: rgb(0, 0, 0),
          });
          page.drawText(`Name: ${currentUser.name}`, {
            x: 50,
            y: y - 30,
            size: 15,
            color: rgb(0, 0, 0),
          });
          page.drawText(`Email: ${currentUser.email}`, {
            x: 50,
            y: y - 60,
            size: 15,
            color: rgb(0, 0, 0),
          });
          page.drawText(`Phone: ${currentUser.phone}`, {
            x: 50,
            y: y - 90,
            size: 15,
            color: rgb(0, 0, 0),
          });
          page.drawText(`Address: ${currentUser.address}`, {
            x: 50,
            y: y - 120,
            size: 15,
            color: rgb(0, 0, 0),
          });
        });

        y -= 150; // Adjust Y position for next user data
      });

      const pdfBytes = await pdfDoc.save();
      this.downloadPDF(pdfBytes, 'users.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }

  private downloadPDF(pdfBytes: Uint8Array, fileName: string): void {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // Automatically download the PDF
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

}

 

