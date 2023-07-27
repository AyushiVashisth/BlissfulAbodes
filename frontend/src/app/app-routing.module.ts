import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PropertyComponent } from './property/property.component';
import { LoginRegisterComponent } from './Login/login.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'property', component: PropertyComponent },
  { path: 'login', component: LoginRegisterComponent},
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
