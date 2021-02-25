import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.loginFormFields();
  }

  ngOnInit(): void {}

  loginFormFields() {
    this.loginForm = this.fb.group({
      emailId: [''],
      password: [''],
    });
  }

  /**
   * Avoid the sapce
   * @param event
   */

  AvoidSpace(event: any) {
    if (event.which === 32 && !event.target.value.length) {
      event.preventDefault();
      false;
      return;
    }
  }

  loginDetails() {
    if (this.loginForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Fill the required fields',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    if (
      this.loginForm.value.emailId === 'admin@gmail.com' &&
      this.loginForm.value.password === 'admin@123'
    ) {
      this.router.navigate(['/student-details']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Check Email and Password',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
