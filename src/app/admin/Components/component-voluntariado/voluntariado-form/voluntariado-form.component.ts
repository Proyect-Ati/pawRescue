// pet-form.component.ts
import { Component, Input, OnChanges, SimpleChanges, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditVoluntariado } from 'src/app/client/services/voluntariado.service';
@Component({
  selector: 'app-voluntariado-form',
  templateUrl: './voluntariado-form.component.html',
  styleUrls: ['./voluntariado-form.component.scss']
})
export class VoluntariadoFormComponent implements OnInit, OnChanges {
  @Input() formData: any;
  @Input() IdData: any;

  @Output() editedDataEmitter = new EventEmitter<any>();
  myForm!: FormGroup;
  edit: boolean = false

  constructor(private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createform();
    this.myForm.valueChanges.subscribe(() => {
      this.editedDataEmitter.emit(this.myForm.value);
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formData']) {
      let dataadopcion: EditVoluntariado = changes['formData'].currentValue;
      this.getApadrinamiento(dataadopcion)
    }
  }

  createform() {
    this.myForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      fechaNac: ['', Validators.required],
      ocupacion: ['', Validators.required],
      correo: ['', Validators.required],
      direccion: ['', Validators.required],
      motivo: ['', Validators.required],
      ciudad: ['', Validators.required],


    });
  }



  setdata(data: EditVoluntariado) {
    if (data) {
      this.edit = true;
      this.myForm.get('fechaNac')?.setValue(data.fechaNac?.slice(0, 10));
      this.myForm.get('nombre')?.setValue(data.nombre);
      this.myForm.get('apellido')?.setValue(data.apellido);
      this.myForm.get('direccion')?.setValue(data.direccion);
      this.myForm.get('correo')?.setValue(data.correo);
      this.myForm.get('motivo')?.setValue(data.motivo);
      this.myForm.get('edad')?.setValue(data.edad);
      this.myForm.get('ciudad')?.setValue(data.ciudad);
      this.myForm.get('ocupacion')?.setValue(data.ocupacion);
    } else {
      this.edit = false;
    }

  }

  getApadrinamiento(dataadopcion?: any): void {
    if (dataadopcion) {
      this.setdata(dataadopcion);
    }
  }


}
