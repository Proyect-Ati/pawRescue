import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AdopcionEditComponent } from '../../../componente-adopcion/pages/adopcion-edit/adopcion-edit.component';
import { ApadrinamientoService, EditApadrinamiento, GedApadrinamiento } from 'src/app/client/services/apadrinamiento.service';


@Component({
  selector: 'app-apadrinamiento-edit',
  templateUrl: './apadrinamiento-edit.component.html',
  styleUrls: ['./apadrinamiento-edit.component.scss']
})
export class ApadrinamientoEditComponent implements OnInit {
  ApadrinamientoData!: GedApadrinamiento;
  editApadrinamient!: EditApadrinamiento;
  state: any[] = []
  aceptarseguimiento: boolean = true
  idAnimal!: number

  constructor(private route: ActivatedRoute,
    private dialogRef: MatDialogRef<AdopcionEditComponent>,
    private serviceApadrinamiento: ApadrinamientoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.getApadrinamient(this.data);
  }


  getApadrinamient(idapadrinamiento: number) {
    this.serviceApadrinamiento.getApadrinamientoByID(idapadrinamiento)
      .subscribe((res) => {
        this.ApadrinamientoData = res.data;
      });
  }

  save() {
    const data = {
      nombre: this.editApadrinamient.nombre,
      apellido: this.editApadrinamient.apellido,
      direccion: this.editApadrinamient.direccion,
      telefono: this.editApadrinamient.telefono,
      correo: this.editApadrinamient.correo,
      motivo: this.editApadrinamient.motivo,
      monto: this.editApadrinamient.monto,
      idAnimal: this.editApadrinamient.idAnimal,
      idPeriodicidad: this.editApadrinamient.idPeriodicidad,
      fechaCreacion: this.editApadrinamient.fechaCreacion,
      idEstado: 1,
    }

    this.serviceApadrinamiento.updateApadrinamiento(data, this.data)
      .subscribe((res) => {
        this.CloseModal(res.statusCode);
      });

  }

  CloseModal(mensaje?: string) {
    this.dialogRef.close(mensaje);
  }

  getData(event: any) {
    this.editApadrinamient = event
  }
}
