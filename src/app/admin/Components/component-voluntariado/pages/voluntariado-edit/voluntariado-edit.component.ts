import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { EditVoluntariado, GetAllVoluntariado, VoluntariadoService } from 'src/app/client/services/voluntariado.service';

@Component({
  selector: 'app-voluntariado-edit',
  templateUrl: './voluntariado-edit.component.html',
  styleUrls: ['./voluntariado-edit.component.scss']
})
export class VoluntariadoEditComponent implements OnInit {
  VoluntariadoData!: GetAllVoluntariado[];
  editVoluntariado!: EditVoluntariado;
  state: any[] = []
  Voluntarioid!: any;
  constructor(
    private dialogRef: MatDialogRef<VoluntariadoEditComponent>,
    private ServiceVoluntariado: VoluntariadoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.getvoluntariado();
  }


  getvoluntariado() {
    this.ServiceVoluntariado.getAllApadrinamiento().pipe(
      finalize(() => {
        this.Voluntarioid = this.VoluntariadoData.find((f: GetAllVoluntariado) => f.idVoluntario === Number(this.data))
        console.log("Voluntarioid",this.Voluntarioid);
        
      })
    ).subscribe((res) => {
      this.VoluntariadoData = res.data;
    });
  }


  save() {
    const data = {
      nombre: this.editVoluntariado.nombre,
      apellido: this.editVoluntariado.apellido,
      direccion: this.editVoluntariado.direccion,
      edad: this.editVoluntariado.edad,
      correo: this.editVoluntariado.correo,
      motivo: this.editVoluntariado.motivo,
      ocupacion: this.editVoluntariado.ocupacion,
      ciudad: this.editVoluntariado.ciudad,
      fechaNac: this.editVoluntariado.fechaNac,
      idEstado: 1,
    }
    console.log("data",data);
    
    this.ServiceVoluntariado.updateApadrinamiento(data, this.data).subscribe((res) => {
      this.CloseModal(res.statusCode);
    });

  }

  CloseModal(mensaje?: string) {
    this.dialogRef.close(mensaje);
  }

  getData(event: any) {
    this.editVoluntariado = event
  }
}
