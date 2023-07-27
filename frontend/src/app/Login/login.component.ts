import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginRegisterComponent {
  loginEmail: string = '';
  loginPassword: string = '';
  username: string = '';
  regEmail: string = '';
  regPassword: string = '';

  constructor(private http: HttpClient) { }

  onLogin() {
    const loginUrl = 'https://blissful-abodes-api.onrender.com/login/guest'; // Replace with your actual login API endpoint
    const loginData = { email: this.loginEmail, password: this.loginPassword };
    console.log(loginData);

    this.http.post(loginUrl, loginData)
      .pipe(
        catchError(error => {
          console.error('Login failed!', error);
          return of(null); // Return a default value on error
        })
      )
      .subscribe(response => {
        if (response) {
          console.log('Login successful!',response);
          // Handle successful login response here if needed
        }
      });
  }

  onSignup() {
    const signupUrl = 'https://blissful-abodes-api.onrender.com/signup/guest'; // Replace with your actual signup API endpoint
    const signupData = { username: this.username, email: this.regEmail, password: this.regPassword };
    console.log(signupData);

    this.http.post(signupUrl, signupData)
      .pipe(
        catchError(error => {
          console.error('Signup failed!', error);
          return of(null); // Return a default value on error
        })
      )
      .subscribe(response => {
        if (response) {
          console.log('Signup successful!',response);
          // Handle successful signup response here if needed
        }
      });
  }
}
