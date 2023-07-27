import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'; // Import SweetAlert

@Component({
  selector: 'app-bookProperty',
  templateUrl: './bookProperty.component.html',
  styleUrls: ['./bookProperty.component.css']
})
export class BookPropertyComponent {
  property: any = {};
  bookDate: string = ''; // Variable to store the selected book date
  endDate: string = ''; // Variable to store the selected end date
  totalDays: number = 0; // Variable to store the calculated total days
  totalRent: number = 0; // Variable to store the calculated total rent
  bookingError: string = ''; // Variable to store any booking errors

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const propertyId = params.get('id');
      if (propertyId) {
        this.fetchProperty(propertyId);
      }
    });
  }

  fetchProperty(propertyId: string): void {
    this.http.get<any>('https://blissful-abodes-api.onrender.com/properties/' + propertyId)
      .subscribe(
        (response) => {
          this.property = response;
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
    const startDate = new Date(this.bookDate);
    const endDate = new Date(this.endDate);
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    this.totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    this.totalRent = this.totalDays * this.property.price;
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
    if (this.property.status === false) {
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
      book_date: this.bookDate,
      end_date: this.endDate,
      total_price: this.totalRent
    };

    // Navigate to the PaymentComponent with the property data as query parameters
    this.router.navigate(['/payment'], { queryParams: paymentData });
    // this.showSuccessAlert('Property booked successfully!');
  }
}