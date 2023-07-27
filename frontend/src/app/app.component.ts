//app.component.ts
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface State {
  name: string;
  showDropdown: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  activeState: State | null = null;
  onLoginClicked() {
    console.log('Login button clicked');
  }
  searchQuery: string = '';
  properties: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  onHome(): void {
    this.router.navigate(['/']);
  }

  onState(): void {
    this.router.navigate(['/property']);
  }
  
  onSearch(): void {
    // Navigate to the '/property' route and pass the search query as a parameter
    this.router.navigate(['/property'], {
      queryParams: { state: this.searchQuery },
    });
  }
  states: State[] = [
    {
      name: 'Delhi',
      showDropdown: false,
    },
    {
      name: 'Uttar Pradesh',
      showDropdown: false,
    },
    {
      name: 'Tamil Nadu',
      showDropdown: false,
    },
    {
      name: 'Telangana',
      showDropdown: false,
    },
    {
      name: 'Karnataka',
      showDropdown: false,
    },
    {
      name: 'Kerala',
      showDropdown: false,
    },
    {
      name: 'West Bengal',
      showDropdown: false,
    },
    {
      name: 'Gujarat',
      showDropdown: false,
    },
    {
      name: 'Haryana',
      showDropdown: false,
    },
    {
      name: 'Chandigarh',
      showDropdown: false,
    },
    {
      name: 'Assam',
      showDropdown: false,
    },
    {
      name: 'Punjab',
      showDropdown: false,
    },
    {
      name: 'Maharashtra',
      showDropdown: false,
    },
  ];

  toggleDropdown(state: State | null): void {
    if (this.activeState === state) {
      this.activeState = null;
    } else {
      this.activeState = state;
      if (state) {
        this.router.navigate(['/property'], {
          queryParams: { state: state.name },
        });
      }
    }
  }
}
