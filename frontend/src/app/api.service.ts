// // property-card.component.ts
// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// interface Property {
//   id: number;
//   name: string;
//   propertyType: string;
//   description: string;
//   price: number;
//   availability: boolean;
//   rating: number;
//   image: string;
// }

// @Component({
//   selector: 'app-property-card',
//   templateUrl: './property-card.component.html',
//   styleUrls: ['./property-card.component.css']
// })
// export class PropertyCardComponent implements OnInit {
//   hosts: any[]; 

//   constructor(private http: HttpClient) { }

//   ngOnInit() {
//     this.getHosts();
//   }

//   getHosts() {
//     this.http.get<any[]>('http://localhost:5000/hosts').subscribe(
//       (response) => {
//         this.hosts = response.hosts;
//       },
//       (error) => {
//         console.error('Error fetching hosts:', error);
//       }
//     );
//   }
// }
