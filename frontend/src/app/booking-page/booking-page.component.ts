import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../services/booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css']
})
export class BookingPageComponent implements OnInit {
  bookedProperties: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
    // Fetch the booked properties from the backend
    this.bookingService.getBookedProperties().subscribe(
      (response: any) => {
        console.log('Booked properties:', response);
        this.bookedProperties = response;

        // Move the code to modify bookedProperties inside the subscription
        this.bookedProperties = this.bookedProperties.map(property => {
          property.property_img = property.property_img[0].replace(/[\[\]']+/g, '');
          return property;
        });
      },
      (error: any) => {
        console.error('Error fetching booked properties:', error);
        // Show SweetAlert error notification
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error fetching booked properties. Please try again later!',
        });
      }
    );
  }

  deleteProperty(bookingId: string): void {
    // Send a request to the backend to delete the booking with the given bookingId
    this.bookingService.deleteBooking(bookingId).subscribe(
      () => {
        // On successful deletion, remove the booking from the bookedProperties array
        this.bookedProperties = this.bookedProperties.filter((property) => property.booking_id !== bookingId);
        // Show SweetAlert success notification
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Booking deleted successfully!',
        });
      },
      (error: any) => {
        console.error('Error deleting booking:', error);
        // Show SweetAlert error notification
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error deleting booking. Please try again later!',
        });
      }
    );
  }
}
