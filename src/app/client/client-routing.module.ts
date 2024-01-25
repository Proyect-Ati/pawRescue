import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SponsoringComponent } from './sponsoring/page/sponsoring.component';
import { AdoptionComponent } from './adoption/adoption.component';
import { FormComponent } from './sponsoring/form/form.component';
import { VolunteeringComponent } from './volunteering/volunteering.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'adoption',
    component: AdoptionComponent,
  },
  {
    path: 'programs',
    children: [
      {
        path: 'sponsors',
        component: SponsoringComponent,
      },
      {
        path: 'volunteering',
        component: VolunteeringComponent, 
      },
      {
        path: 'form',
        component: FormComponent,
      },
    ],
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },

  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
