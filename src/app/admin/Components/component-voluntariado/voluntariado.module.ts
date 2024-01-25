import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoluntariadoAddComponent } from './pages/voluntariado-add/voluntariado-add.component';
import { VoluntariadoEditComponent } from './pages/voluntariado-edit/voluntariado-edit.component';
import { VoluntariadoListComponent } from './pages/voluntariado-list/voluntariado-list.component';
import { VoluntariadoFormComponent } from './voluntariado-form/voluntariado-form.component';
import { MaterialModule } from 'src/app/material/material.module';
import { AppRoutingVoluntariadoModule } from './app-routing-voluntariado.module';



@NgModule({
  declarations: [
    VoluntariadoListComponent,
    VoluntariadoEditComponent,
    VoluntariadoAddComponent,
    VoluntariadoFormComponent],
  imports: [
    CommonModule,
    AppRoutingVoluntariadoModule,
    MaterialModule
  ]
})
export class VoluntariadoModule { }
