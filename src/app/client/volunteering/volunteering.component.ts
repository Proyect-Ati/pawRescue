import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { VoluntariadoAddComponent } from 'src/app/admin/Components/component-voluntariado/pages/voluntariado-add/voluntariado-add.component';

@Component({
  selector: 'app-volunteering',
  templateUrl: './volunteering.component.html',
  styleUrls: ['./volunteering.component.scss']
})
export class VolunteeringComponent {
  button = 'Ser Voluntario';

  constructor(
    public dialog: MatDialog,
  ) {
  }


  openModal(): void {
    const dialogRef: MatDialogRef<VoluntariadoAddComponent> = this.dialog.open(VoluntariadoAddComponent, {
      width: '800px',
      maxHeight: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === '201') {
        this.dialog.open(ModalComponent, {
          maxWidth: '40vw',
          data: {
            title: 'Gracias por Registrarte',
            message:
              'En los próximos días te enviaremos un correo electrónico confirmando si tu solicitud fue aprobada.',
            img: 'https://static.wixstatic.com/media/00c99f_16150206efc540598d6a6b53c4ae74a9~mv2.jpg/v1/fit/w_2500,h_1330,al_c/00c99f_16150206efc540598d6a6b53c4ae74a9~mv2.jpg ',
          },
        });
      }
    });




  }
}
