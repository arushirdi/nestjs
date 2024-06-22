import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { UserService } from '../service/user.service';
import { User } from '../user';
import { PdfGeneratorService } from '../service/pdf-generator.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() users: User[] = [];
  @Output() editUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<User>();
  @Output() printUser = new EventEmitter<User>();
  @Output() downloadPdf = new EventEmitter<User>();

  filteredUsers: User[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 5;

  constructor(private userService: UserService, private pdfGeneratorService: PdfGeneratorService) { }

  ngOnInit(): void {
    this.filteredUsers = [...this.users];
    this.updatePagination();
    this.loadUsers()
  }


  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error('Error loading users:', error);
      }
    );
  }

  onDelete(user: any): void {
    const confirmation = confirm(`
      Are you sure you want to delete ${user.name}?
      This action cannot be undone.`);
    
    if (confirmation) {
      this.userService.deleteUser(user.id).subscribe(
        () => {
          // Filter out the deleted user from the list
          this.users = this.users.filter(u => u.id !== user.id);
          // Update pagination or any other necessary logic
        },
        error => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  download(user: User): void {
    // Call PdfGeneratorService to generate and download PDF
    this.pdfGeneratorService.generatePDF(user).then(() => {
      console.log('PDF generated and downloaded successfully');
    }).catch(error => {
      console.error('Error generating PDF:', error);
    });
  }
  edit(user: User): void {
    // Implement edit action
    console.log('Edit:', user);

    // Assuming you have an edit form component, you can navigate to it and pass the user ID
    // this.router.navigate(['/edit-user', user.id]);

    // Example of updating inline without navigating to a separate form
    this.userService.updateUser(user).subscribe(
      updatedUser => {
        // Update the user in the local array
        const index = this.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
        // Optionally update the filteredUsers array and pagination logic if needed
        this.updatePagination();
      },
      error => {
        console.error('Error updating user:', error);
      }
    );
  }

  

  updatePagination(): void {
    // Filter users based on search term
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.address.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // Calculate pagination
    this.goToPage(1); // Reset to first page
  }



  goToPage(page: number): void {
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.filteredUsers = this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
  }

 

  delete(user: User): void {
    this.deleteUser.emit(user);
  }



 

  // Generate array of pages for pagination
  get pages(): number[] {
    const totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.pageSize);
  }
}
