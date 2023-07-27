import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PropertyComponent } from './property/property.component';
import { LoginRegisterComponent } from './Login/login.component';
import { BookPropertyComponent } from './bookProperty/bookProperty.component';
import { PaymentComponent } from './booking/booking.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'property', component: PropertyComponent },
  { path: 'login', component: LoginRegisterComponent},
  { path: "bookProperty/:id", component: BookPropertyComponent},
  { path: "bookpayment", component: PaymentComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
