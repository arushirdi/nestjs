import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../user';

import Swal from 'sweetalert2';  // Import SweetAlert2

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {

  userForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  

  ngOnInit(): void {
    
   }

  

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value).subscribe(
        response => {
          Swal.fire('Success', 'User added successfully', 'success'); // Success alert
          console.log('User added successfully:', response);
          this.userForm.reset();
          // Optionally, navigate to another route after successful submission
          this.router.navigate(['/table']);
        },
        error => {
          Swal.fire('Error', 'Error adding user', 'error'); // Error alert
          console.error('Error adding user:', error);
        }
      );
    } else {
      console.error('Form is invalid');
      this.markAllAsTouched();
      Swal.fire('Invalid Form', 'Please fill all required fields correctly', 'warning'); // Invalid form alert
    }
  }

  private markAllAsTouched() {
    this.userForm.markAllAsTouched();
  }
}
