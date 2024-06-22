import { Component } from '@angular/core';
import { PdfGeneratorService } from '../service/pdf-generator.service';

@Component({
  selector: 'app-pdf-download',
  templateUrl: './pdf-download.component.html',
  styleUrls: ['./pdf-download.component.css']
})
export class PdfDownloadComponent {

  constructor(private pdfGeneratorService: PdfGeneratorService) { }

  downloadPDF() {
    this.pdfGeneratorService.generatePDF2();
  }

}
