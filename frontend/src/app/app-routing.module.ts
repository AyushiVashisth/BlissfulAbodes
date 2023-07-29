import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PropertyComponent } from './property/property.component';
import { LoginRegisterComponent } from './Login/login.component';
import { BookPropertyComponent } from './bookProperty/bookProperty.component';
import { BookingComponent } from './booking/booking.component';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'property', component: PropertyComponent },
  { path: 'booking', component: BookingPageComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginRegisterComponent},
  { path: "bookProperty/:id", component: BookPropertyComponent, canActivate: [AuthGuard]},
  { path: "bookpayment", component: BookingComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
