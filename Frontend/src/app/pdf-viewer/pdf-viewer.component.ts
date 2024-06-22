import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../user';
import { PdfGeneratorService } from '../service/pdf-generator.service';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})



export class PdfViewerComponent implements OnInit {


    @Input() users: User[] = [];
   
    @Output() downloadPdf = new EventEmitter<User>();

  constructor(private userService: UserService, private pdfGeneratorService: PdfGeneratorService) { }
  ngOnInit(): void {
  
  }

  // Add logic to display PDF


  download(user: User): void {
    // Call PdfGeneratorService to generate and download PDF
    this.pdfGeneratorService.generatePDF(user).then(() => {
      console.log('PDF generated and downloaded successfully');
    }).catch(error => {
      console.error('Error generating PDF:', error);
    });
  }
}
