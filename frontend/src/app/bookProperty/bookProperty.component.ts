import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'; // Import SweetAlert

@Component({
  selector: 'app-bookProperty',
  templateUrl: './bookProperty.component.html',
  styleUrls: ['./bookProperty.component.css'],
})
export class BookPropertyComponent {
  property: any = {};
  bookDate: string = ''; // Variable to store the selected book date
  checkInDate: string = '';
  checkOutDate: string = ''; // Variable to store the selected end date
  totalDays: number = 0; // Variable to store the calculated total days
  totalRent: number = 0; // Variable to store the calculated total rent
  bookingError: string = ''; // Variable to store any booking errors

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async (params) => {
      const propertyId = params.get('id');
      if (propertyId) {
        await this.fetchProperty(propertyId);
        this.calculateTotalRent();
      }
    });
  }

  fetchProperty(propertyId: string): void {
    this.http
      .get<any>(
        'https://blissful-abodes-api.onrender.com/properties/' + propertyId
      )
      .subscribe(
        (response) => {
          this.property = response;
          // Parse the price property as a number
          this.property.price = parseFloat(this.property.price);
          // Alternatively, if the price is an integer, use parseInt
          // this.property.price = parseInt(this.property.price);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  goBack(): void {
    this.router.navigate(['/property']);
  }

  calculateTotalRent(): void {
    console.log('Check-in Date:', this.checkInDate);
    console.log('Check-out Date:', this.checkOutDate);
    console.log('Property Price:', this.property.price);

    // Check if property.price is a valid number
    if (typeof this.property.price !== 'number' || isNaN(this.property.price)) {
      console.error('Invalid Property Price:', this.property.price);
      return;
    }

    const checkInDate = new Date(this.checkInDate);
    const checkOutDate = new Date(this.checkOutDate);

    console.log('Parsed Check-in Date:', checkInDate);
    console.log('Parsed Check-out Date:', checkOutDate);

    // Check if checkOutDate is truthy (not empty, undefined, or null)
    if (checkOutDate) {
      const timeDiff = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
      this.totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      this.totalRent = this.totalDays * +this.property.price;
      console.log(timeDiff, this.totalRent, this.totalDays);
    } else {
      // Handle the case when checkOutDate is not set
      console.log('Check-out Date is not set.');
      this.totalDays = 0;
      this.totalRent = 0;
    }
  }

  // Function to show SweetAlert success notification
  showSuccessAlert(message: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
    });
  }

  // Function to show SweetAlert error notification
  showErrorAlert(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

  bookProperty(): void {
    if (this.property.availability === false) {
      this.bookingError = 'Property not available for booking.';
      this.showErrorAlert(this.bookingError);
      return;
    }

    // Prepare the data for the POST request
    const paymentData = {
      property_id: this.property.id,
      property_name: this.property.property_name,
      price: this.property.price,
      property_location: this.property.location,
      property_image: this.property.image,
      book_date: this.checkInDate,
      end_date: this.checkOutDate,
      total_price: this.totalRent,
    };

    // Navigate to the PaymentComponent with the property data as query parameters
    this.router.navigate(['/bookpayment'], { queryParams: paymentData });
    // this.showSuccessAlert('Property booked successfully!');
  }
}
