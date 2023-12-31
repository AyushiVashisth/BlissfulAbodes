// booking.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  // Corrected class name to BookingComponent
  step1Form!: FormGroup;
  step2Form!: FormGroup;
  propertyData: any = {};
  currentStep: number = 1;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.route.queryParams.subscribe((params) => {
      this.propertyData = params;
      console.log(this.propertyData);
    });
  }

  initForms(): void {
    this.step1Form = this.fb.group({
      fullName: ['', Validators.required],
      age: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      gender: ['', Validators.required],
      mobileNo: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
    });

    this.step2Form = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
      confirmCardNumber: ['', Validators.required],
      cardName: ['', Validators.required],
      expiryDate: [
        '',
        [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/\\d{2}$')],
      ],
      cvv: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
    });
  }

  goToStep(step: number): void {
    if (this.currentStep === 1 && this.step1Form.invalid) {
      this.showErrorAlert('Please fill all required fields in Step 1.');
      return;
    }
    if (this.currentStep === 2 && this.step2Form.invalid) {
      this.showErrorAlert('Please fill all required fields in Step 2.');
      return;
    }
    this.currentStep = step;
  }

  showSuccessAlert(message: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
    });
  }

  showErrorAlert(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

  makePayment(): void {
    // Access form values for Step 3 (Card Information)
    const cardNumber = this.step2Form.get('cardNumber')?.value;
    const cardName = this.step2Form.get('cardName')?.value;
    const expiryDate = this.step2Form.get('expiryDate')?.value;
    const cvv = this.step2Form.get('cvv')?.value;

    // Prepare payment data (simulated)
    const paymentData = {
      cardNumber,
      cardName,
      expiryDate,
      cvv,
      totalAmount: this.propertyData.total_price,
    };

    // Simulate payment request
    console.log('Payment Data:', paymentData);

    // Make the POST request to book the property
    this.http
      .post<any>('https://blissful-abodes-api.onrender.com/properties/book', this.propertyData).subscribe(
        (response) => {
          // Handle the response after successful booking
          console.log(response);
          this.showSuccessAlert('Property booked successfully!');
          this.router.navigate(['/']); // You can perform any other actions here, e.g., show a success message, navigate to a new page, etc.
        },
        (error) => {
          // Handle errors if any
          console.error(error);
          this.showErrorAlert('Error occurred during booking. Please try again.'); // You can show an error message to the user or handle the error as per your requirement
        }
      );
  }
}
