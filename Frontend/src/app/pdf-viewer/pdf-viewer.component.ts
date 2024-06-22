import { Component, Input } from '@angular/core';
import { User } from '../user';
import { PdfGeneratorService } from '../service/pdf-generator.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent {
  constructor(private userService: UserService, private pdfGeneratorService: PdfGeneratorService) { }

  @Input() users: User[] = [];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users.map(user => ({ ...user, pdfVisible: false }));
      },
      error => {
        console.error('Error loading users:', error);
      }
    );
  }

  downloadPdf(user: User): void {
    this.pdfGeneratorService.generatePDF(user);
  }

  generatePdfLink(user: User): string {
    // Replace with your logic to generate the PDF link
    return `/api/pdf/${user.id}`;
  }

  togglePdfViewer(user: User): void {
    user.pdfVisible = !user.pdfVisible;
  }
}
