import { Component, Inject } from '@angular/core';
import { PetAddComponent } from '../../../component-animal/pages/pet-add/pet-add.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApadrinamientoService, GedApadrinamiento } from 'src/app/client/services/apadrinamiento.service';
import * as moment from 'moment';

@Component({
  selector: 'app-apadrinamiento-add',
  templateUrl: './apadrinamiento-add.component.html',
  styleUrls: ['./apadrinamiento-add.component.scss']
})
export class ApadrinamientoAddComponent {
  addApadrinamiento!: GedApadrinamiento;
  constructor(
    private ServiceApadrinamiento: ApadrinamientoService,
    private dialogRef: MatDialogRef<PetAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  saveAnimal() {
    const today = moment();
    const data = {
      nombre: this.addApadrinamiento.nombre,
      apellido: this.addApadrinamiento.apellido,
      fechaCreacion: today.format('YYYY-MM-DD'),
      direccion: this.addApadrinamiento.direccion,
      telefono: this.addApadrinamiento.telefono,
      correo: this.addApadrinamiento.correo,
      motivo: this.addApadrinamiento.motivo,
      monto: this.addApadrinamiento.monto,
      idAnimal: this.addApadrinamiento.idAnimal,
      idPeriodicidad: this.addApadrinamiento.idPeriodicidad
    }


    this.ServiceApadrinamiento.AddApadrinamiento(data).subscribe((res) => {

      this.CloseModal(res.statusCode);

    });
  }

  getData(event: any) {
    this.addApadrinamiento = event
  }

  CloseModal(mensaje?: string) {
    this.dialogRef.close(mensaje);
  }

}
