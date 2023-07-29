import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginRegisterComponent {
  loginEmail: string = '';
  loginPassword: string = '';
  username: string = '';
  regEmail: string = '';
  regPassword: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const loginUrl = 'https://blissful-abodes-api.onrender.com/login/guest';
    const loginData = { email: this.loginEmail, password: this.loginPassword };

    this.http
      .post(loginUrl, loginData)
      .pipe(
        catchError((error) => {
          console.error('Login failed!', error);
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          localStorage.setItem('userRole', 'guest'); // Set userRole to 'guest'
          console.log('Login successful!', response);
          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'You have successfully logged in.',
          });
          this.router.navigate(['/']);
          // Handle successful login response here if needed
        }
      });
  }

  onSignup() {
    const signupUrl = 'https://blissful-abodes-api.onrender.com/signup/guest';
    const signupData = {
      username: this.username,
      email: this.regEmail,
      password: this.regPassword,
    };

    this.http
      .post(signupUrl, signupData)
      .pipe(
        catchError((error) => {
          console.error('Signup failed!', error);
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          console.log('Signup successful!', response);
          localStorage.setItem('username', this.username); // Store the username in localStorage
          Swal.fire({
            icon: 'success',
            title: 'Signup Successful!',
            text: 'You have successfully registered.',
          });
          // Handle successful signup response here if needed
        }
      });
  }
}
