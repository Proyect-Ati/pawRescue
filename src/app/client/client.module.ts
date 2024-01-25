import { NgModule } from '@angular/core';

import { ClientRoutingModule } from './client-routing.module';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SponsoringComponent } from './sponsoring/page/sponsoring.component';
import { AdoptionComponent } from './adoption/adoption.component';
import { SharedModule } from '../shared/shared.module';
import { FormComponent } from './sponsoring/form/form.component';
import { VolunteeringComponent } from './volunteering/volunteering.component';


@NgModule({
  declarations: [
    HomeComponent,
    ContactUsComponent,
    SponsoringComponent,
    AdoptionComponent,
    FormComponent,
    VolunteeringComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ],
})
export class ClientModule { }
