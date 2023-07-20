//app.component.ts
import { Component } from '@angular/core';

interface Location {
  name: string;
  more: string[];
  showDropdown: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  activeLocation: Location | null = null;
  onLoginClicked() {
    console.log('Login button clicked');
  }

  onSearch(location: string) {
    console.log('Search location:', location);
  }
  locations: Location[] = [
    {
      name: 'Goa',
      more: [
        'Popular Localities',
        'Baga Beach North Goa',
        'Panjim',
        'Madgaon',
        'Calangute',
        'Vasco Da Gama',
        'Porvorim',
        'South Goa',
        'Madgaon Railway Station',
        'Mapusa',
        'Panaji',
      ],
      showDropdown: false,
    },
    {
      name: 'Mumbai',
      more: [
        'Popular Localities',
        'Andheri East',
        'Vashi',
        'Thane',
        'Dadar',
        'Andheri',
        'Panvel',
        'Bandra',
        'Saki Naka',
        'Malad West',
      ],
      showDropdown: false,
    },
    {
      name: 'Delhi',
      more: [
        'Popular Localities',
        'Mahipalpur',
        'New Delhi Railway Station',
        'Paharganj',
        'Karol Bagh Metro Station',
        'Rohini',
        'Dwarka, New Delhi',
        'Indira Gandhi International Airport',
        'Laxmi Nagar',
        'Lajpat Nagar',
      ],
      showDropdown: false,
    },
    {
      name: 'Bangalore',
      more: [
        'Popular Localities',
        'Koramangala',
        'Majestic',
        'Madiwala',
        'Marathahalli',
        'Hsr Layout',
        'Indiranagar',
        'Kempegowda International Airport',
        'Whitefield',
        'Jp Nagar',
        'Jayanagar',
      ],
      showDropdown: false,
    },
    {
      name: 'Hyderabad',
      more: [
        'Popular Localities',
        'Secunderabad  Railway Station',
        'Gachibowli ',
        'Madhapur',
        'LB Nagar',
        'Kukatpally',
        'Ameerpet',
        'Hitech City',
        'Kondapur',
        'Begumpet',
        'Banjara Hills',
      ],
      showDropdown: false,
    },
    {
      name: 'Chennai',
      more: [
        'Popular Localities',
        'Mount Road',
        'Chennai Central Railway Station',
        'Ecr East Coast Road',
        'T Nagar',
        'Anna Nagar',
        'Velachery',
        'Chennai International Airport',
        'Koyambedu',
        'Guindy',
        'Tambaram',
      ],
      showDropdown: false,
    },
    {
      name: 'Gurgaon',
      more: [
        'Popular Localities',
        'Huda City Center Metro',
        'Mg Road',
        'Gurgaon Bus Stand',
        'Sector 14',
        'DLF Phase 3',
        'Sector 29',
        'Medanta Hospital',
        'Sector 38',
        'Iffco Chowk',
        'Gurgaon Palam Vihar',
      ],
      showDropdown: false,
    },
    {
      name: 'Kolkata',
      more: [
        'Popular Localities',
        'New Town',
        'Howrah Railway Station',
        'Salt Lake City',
        'Kolkata International Airport',
        'Park Street',
        'Sealdah Railway Station',
        'Dum Dum',
        'Esplanade Metro Station',
        'Sector 5 Salt Lake City',
        'Dum Dum Airport 1 No. Gate',
      ],
      showDropdown: false,
    },
    {
      name: 'Noida',
      more: [
        'Popular Localities',
        'Sector 62',
        'Sector 18',
        'Pari Chowk',
        'Sector 15',
        'Greater Noida',
        'Noida City Centre',
        'Sector 51',
        'Sector 66',
        'Gaziabad',
        'Botanical Garden',
      ],
      showDropdown: false,
    },
    {
      name: 'Pune',
      more: [
        'Popular Localities',
        'Pimpri Chinchwad',
        'Viman Nagar',
        'Shivaji Nagar',
        'Baner',
        'Pune Railway Station',
        'Hinjewadi',
        'Kharadi',
        'Wakad',
        'Hadapsar',
        'Katraj',
      ],
      showDropdown: false,
    },
    {
      name: 'Puri',
      more: [
        'Popular Localities',
        'Baga Beach North Goa',
        'Panjim',
        'Madgaon',
        'Calangute',
        'Vasco Da Gama',
        'Porvorim',
        'South Goa',
        'Madgaon Railway Station',
        'Mapusa',
        'Panaji',
      ],
      showDropdown: false,
    },
  ];

  toggleDropdown(location: Location | null): void {
    if (this.activeLocation === location) {
      this.activeLocation = null;
    } else {
      this.activeLocation = location;
    }
  }
}
