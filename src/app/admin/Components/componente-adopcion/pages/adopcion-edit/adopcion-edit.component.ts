// pet-edit.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AdopcionesService } from 'src/app/client/services/adopciones.service';
import { PetService } from 'src/app/client/services/pet.service';
@Component({
  selector: 'app-adopcion-edit',
  templateUrl: './adopcion-edit.component.html',
  styleUrls: ['./adopcion-edit.component.scss']
})
export class AdopcionEditComponent implements OnInit {
  adopcionData!: any;
  editadopcion!: any;
  state: any[] = []
  aceptarseguimiento: boolean = true
  idAnimal!: number

  constructor(private route: ActivatedRoute,
    private ServiceAdopcion: AdopcionesService,
    private animalService: PetService,
    private dialogRef: MatDialogRef<AdopcionEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.getAdopcion(this.data);
  }


  getAdopcion(idAnimal: number) {
    this.ServiceAdopcion.getAdopcionById(idAnimal).pipe(
      finalize(() => {
        this.getEstados();
      })
    ).subscribe((res) => {
      this.adopcionData = res.data;
    });
  }

  getEstados(): void {
    this.animalService.GetEstados().pipe(
      finalize(() => {
        this.showsection();
      })
    ).subscribe((res) => {
      this.state = res.data;
    });
  }

  showsection() {
    const FindEstudio = this.state.find(state => state.idEstado === this.adopcionData.estadoAdopcion);
    if (FindEstudio?.estadoDesc === "Aprobado") {
      this.aceptarseguimiento = false;
    }
  }



  save(state: boolean) {
    const value = state ? "Aprobado" : "Rechazado"
    const FindEstudio = this.state.find(state => state.estadoDesc === value)
    const data = {
      nombre: this.editadopcion.nombre,
      apellido: this.editadopcion.apellido,
      direccion: this.editadopcion.direccion,
      fechaNac: this.editadopcion.fechaNac,
      telefono: this.editadopcion.telefono,
      correo: this.editadopcion.correo,
      idEstudios: this.editadopcion.idEstudios,
      motivo: this.editadopcion.motivo,
      idAnimal: this.editadopcion.idAnimal,
      idEstado: FindEstudio?.idEstado,
      fechaVisita: this.editadopcion.sateseguimiento.fechaVisita,
      estadoSeguimiento: this.editadopcion.sateseguimiento.estadoSeguimiento ?? false,
      detallesSeguimiento: this.editadopcion.sateseguimiento.detallesSeguimiento,
      idUsuario: 1
    }

    this.ServiceAdopcion.updateAdopción(data, this.data).subscribe((res) => {
      this.CloseModal(res.statusCode);
    });

  }
  CloseModal(mensaje?: string) {
    this.dialogRef.close(mensaje);
  }

  getData(event: any) {
    this.editadopcion = event
  }
}
