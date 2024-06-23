import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { PdfGeneratorService } from '../service/pdf-generator.service';
import { User } from '../user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() users: User[] = [];
  @Output() editUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<User>();
  @Output() downloadPdf = new EventEmitter<User>();

  userForm: FormGroup;
  filteredUsers: User[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
 
  @ViewChild('closeModalButton') closeModalButton!: ElementRef; // Use non-null assertion operator

  currentUser: User | null = null; // Store the currently edited user

  constructor(private fb: FormBuilder,private router: Router, private userService: UserService, private pdfGeneratorService: PdfGeneratorService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users;
        this.updatePagination();
      },
      error => {
        console.error('Error loading users:', error);
      }
    );
  }

  onDelete(user: User): void {
    const confirmation = confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`);
    if (confirmation) {
      this.userService.deleteUser(user.id).subscribe(
        () => {
          this.users = this.users.filter(u => u.id !== user.id);
          this.updatePagination();
        },
        error => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  download(user: User): void {
    this.pdfGeneratorService.generatePDF(user).then(() => {
      console.log('PDF generated and downloaded successfully');
    }).catch(error => {
      console.error('Error generating PDF:', error);
    });
  }

  edit(user: User): void {
    this.currentUser = user; // Store the currently edited user
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address
    });
    this.editUser.emit(user);
  }

  onUpdate(): void {
    if (this.currentUser) {
      const updatedUser: User = { ...this.userForm.value, id: this.currentUser.id };
      this.userService.updateUser(updatedUser).subscribe(
        () => {
          const index = this.users.findIndex(u => u.id === updatedUser.id);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }

          this.userForm.reset(); // Reset the form
          this.closeModalButton.nativeElement.click(); // Close the modal

          // Show success message and navigate back to table view
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'User data updated successfully!',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            // Optionally, navigate to another route after successful submission
            this.router.navigate(['/table']);
          });
        },
        error => {
          console.error('Error updating user:', error);
        }
      );
    } else {
      console.error('No user is being edited.');
    }
  }


  updatePagination(): void {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.address.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
   
  }

 

}
