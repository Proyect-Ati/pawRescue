import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderLoginComponent } from './header/header-login/header-login.component';
import { ClientRoutingModule } from '../client/client-routing.module';
import { MaterialModule } from '../material/material.module';
import { ButtonComponent } from './button/button.component';
import { ModalComponent } from './modal/modal.component';
import { ToastDangerComponent } from './customs/toast-danger.component';
import { ToastSucessComponent } from './customs/toast-sucess.component';
import { ToastWarningComponent } from './customs/toast-warning.component';
import { PetLoadingComponent } from './pet-loading/pet-loading.component';

@NgModule({
  declarations: [
    MenuComponent,
    InitialPageComponent,
    FooterComponent,
    HeaderLoginComponent,
    ButtonComponent,
    ModalComponent,
    ToastDangerComponent,
    ToastSucessComponent,
    ToastWarningComponent,
    PetLoadingComponent,
  ],
  imports: [CommonModule, MaterialModule, ClientRoutingModule],
  exports: [
    MenuComponent,
    InitialPageComponent,
    FooterComponent,
    HeaderLoginComponent,
    ButtonComponent,
    ToastDangerComponent,
    ToastSucessComponent,
    ToastWarningComponent,
    PetLoadingComponent,
  ],
})
export class SharedModule {}
