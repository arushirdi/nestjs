// src/pdf/pdf.controller.ts

import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '../user/user.service';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(
    private readonly usersService: UsersService,
    private readonly pdfService: PdfService,
  ) {}

  @Get()
  async generateUsersPdf(@Res() res: Response): Promise<void> {
    try {
      const users = await this.usersService.findAll();
      const pdfPath = await this.pdfService.generatePDF(users);

      res.setHeader('Content-Type', 'application/pdf');
      res.download(pdfPath, 'users.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send('Error generating PDF');
    }
  }
}
