import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import Swal from 'sweetalert2'; // Import SweetAlert

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if the user is logged in and has a valid role
    const userRole = localStorage.getItem('userRole');

    if (!userRole) {
      // If not logged in, redirect to the home page or login page
      this.router.navigate(['/']); // Replace '/home' with the appropriate home page URL
      this.showErrorAlert('Please log in to access this page.');
      return false;
    }

    const isGuest = userRole === 'guest';
    const isHost = userRole === 'host';

    if (state.url.includes('/booking') || (state.url.includes('/bookProperty/') && isGuest)) {
      // Allow access to the booking route for guests
      return true;
    } else if (
      (state.url.includes('/property-admin') || state.url.includes('/property/') || state.url.includes('/property/edit/')) &&
      isHost
    ) {
      // Allow access to the property-admin, property/:id, and property/edit/:id routes for hosts
      return true;
    } else {
      // If the user has an unknown role or is not authorized for the current route, redirect to the home page or display an alert
      this.router.navigate(['/']); // Replace '/home' with the appropriate home page URL
      this.showErrorAlert('You are not authorized to access this page.');
      return false;
    }
  }

  // Function to show SweetAlert error notification
  showErrorAlert(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }
}