import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PropertyComponent } from './property/property.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginRegisterComponent } from './Login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { BookingComponent } from './booking/booking.component';
import { BookPropertyComponent } from './bookProperty/bookProperty.component';
import { BookingPageComponent } from './booking-page/booking-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    PropertyComponent,
    LoginRegisterComponent,
    BookPropertyComponent,
    BookingComponent,
    BookingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }