import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css'],
})
export class HostDetailsComponent implements OnInit {
  hosts: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:5000/hosts').subscribe((data) => {
      this.hosts = data.hosts;
    });
  }
}
