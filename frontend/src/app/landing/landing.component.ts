import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  uae = false;
  nepal = false;
  china = false;
  india = false;
  malayasia = false;
  indo = false;

  handleUae(): void {
    this.uae = true;
  }

  handlenepal(): void {
    this.nepal = true;
  }

  handlechina(): void {
    this.china = true;
  }

  handleindia(): void {
    this.india = true;
  }

  handlemalayasia(): void {
    this.malayasia = true;
  }

  handleindo(): void {
    this.indo = true;
  }
}
