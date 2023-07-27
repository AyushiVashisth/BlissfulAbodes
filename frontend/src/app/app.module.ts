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
import { FormsModule } from '@angular/forms'; 
import { BookPropertyComponent } from './bookProperty/bookProperty.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    PropertyComponent,
    LoginRegisterComponent,
    BookPropertyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }