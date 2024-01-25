import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel/panel.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [LoginGuard],
    component: LoginComponent,
  },
  {
    path: 'panel',
    component: PanelComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'pet-module',
        loadChildren: () =>
          import('./Components/component-animal/pet.module').then(
            (m) => m.PetModule,
          ),
      },
      {
        path: 'adoption',
        loadChildren: () =>
          import('./Components/componente-adopcion/adopcion.module').then(
            (m) => m.AdopcionModule,
          ),
      },
      {
        path: 'programs/volunteering',
        loadChildren: () =>
          import('./Components/component-voluntariado/voluntariado.module').then(
            (m) => m.VoluntariadoModule,
          ),
      },
      {
        path: 'programs/sponsors',
        loadChildren: () =>
          import(
            './Components/component-apadrinamiento/apadrinamiento.module'
          ).then((m) => m.ApadrinamientoModule),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
  panelOpenState = false;
}
