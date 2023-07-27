import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../services/property.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css'],
})
export class PropertyComponent implements OnInit {
  properties: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 9;
  nameFilter: string = '';
  propertyNameFilter: string = '';
  stateFilter: string = '';
  sortField: string = 'price';
  sortOrder: number = 1;
  propertyAvailabilityFilter: boolean = false; 

  constructor(
    private propertyService: PropertyService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.stateFilter = params['state'] || '';
      this.getProperties();
    });
  }

  getProperties(): void {
    this.propertyService
      .getAllProperties(
        this.currentPage,
        this.perPage,
        this.nameFilter,
        this.propertyNameFilter,
        this.stateFilter,
        this.sortOrder, 
        this.sortField,
        this.propertyAvailabilityFilter
        
      )
      .subscribe(
        (response: any) => {
          this.properties = response;
          console.log(response)
          this.totalPages = response.totalPages;
        },
        (error: any) => {
          console.error('Error fetching properties:', error);
        }
      );
  }

  applyFilters(): void {
    this.currentPage = 1;
    console.log(this.propertyAvailabilityFilter)
    this.getProperties();
  }
  
  

  nextPage(): void {
    this.currentPage++;
    this.getProperties();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getProperties();
    }
  }

  viewPreview(propertyId: string): void {
    this.router.navigate(['/bookProperty', propertyId]);
  }

  toggleSortDirection(): void {
    this.getProperties();
  }

  getStarArray(rating: number): number[] {
    const wholeStars = Math.floor(rating);
    const fractionalStar = rating - wholeStars;

    const stars: number[] = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= wholeStars) {
        // Full star
        stars.push(100); // 100 represents a fully filled star
      } else if (i === wholeStars + 1 && fractionalStar > 0) {
        // Fractional star
        stars.push(fractionalStar * 100);
      } else {
        // Empty star
        stars.push(0);
      }
    }

    return stars;
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
}
