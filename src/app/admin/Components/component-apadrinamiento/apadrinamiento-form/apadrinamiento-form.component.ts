// pet-form.component.ts
import { Component, Input, OnChanges, SimpleChanges, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';
import { EditApadrinamiento } from 'src/app/client/services/apadrinamiento.service';
import { PetService } from 'src/app/client/services/pet.service';
export interface State {
  idEstado: number
  estadoDesc: string
  adopciones: any[]
  animales: any[]
  apadrinamientos: any[]
  rescates: any[]
  usuarios: any[]
  voluntarios: any[]
}

@Component({
  selector: 'app-apadrinamiento-form',
  templateUrl: './apadrinamiento-form.component.html',
  styleUrls: ['./apadrinamiento-form.component.scss']
})
export class ApadrinamientoFormComponent implements OnInit, OnChanges {
  @Input() formData: any;
  @Input() IdData: any;

  @Output() editedDataEmitter = new EventEmitter<any>();
  myForm!: FormGroup;
  animaldata: any[] = []
  edit: boolean = false
  stateanimal: State[] = []

  constructor(private fb: FormBuilder,
    private animalService: PetService,
  ) { }

  ngOnInit(): void {
    this.createform();
    this.myForm.valueChanges.subscribe(() => {
      this.editedDataEmitter.emit(this.myForm.value);
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formData']) {
      let dataadopcion: EditApadrinamiento = changes['formData'].currentValue;
      this.getApadrinamiento(dataadopcion)
    } else if (changes['IdData']) {
      this.IdData = changes['IdData'].currentValue;
      this.getApadrinamiento()
    }
  }

  createform() {
    this.myForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
      idEstudios: ['', Validators.required],
      motivo: ['', Validators.required],
      idAnimal: ['', Validators.required],
      nameAnimal: ['', Validators.required],
      idEstado: ['', Validators.required],
      monto: ['', Validators.required],
      idPeriodicidad: ['', Validators.required]
    });
  }


  setRegiste(data: any) {
    if (data) {
      const FindAnimal = this.animaldata.find(animal => animal.idAnimal === data.idAnimal);
      this.myForm.get('idAnimal')?.setValue(data.idAnimal);
      this.myForm.get('nameAnimal')?.setValue(FindAnimal.nombre);
    }
  }

  setdata(data: EditApadrinamiento) {
    if (data) {
      this.edit = true;
      const today = moment();
      const FindAnimal = this.animaldata.find(animal => animal.idAnimal === data.idAnimal);
      this.myForm.get('fechaCreacion')?.setValue(today.format('YYYY-MM-DD'));
      this.myForm.get('nombre')?.setValue(data.nombre);
      this.myForm.get('apellido')?.setValue(data.apellido);
      this.myForm.get('direccion')?.setValue(data.direccion);
      this.myForm.get('telefono')?.setValue(data.telefono);
      this.myForm.get('correo')?.setValue(data.correo);
      this.myForm.get('motivo')?.setValue(data.motivo);
      this.myForm.get('monto')?.setValue(data.monto);
      this.myForm.get('idAnimal')?.setValue(data.idAnimal);
      this.myForm.get('nameAnimal')?.setValue(FindAnimal.nombre);
      this.myForm.get('idPeriodicidad')?.setValue(data.idPeriodicidad);

    } else {
      this.edit = false;
    }

  }

  getApadrinamiento(dataadopcion?: any): void {
    this.animalService.getAnimals().pipe(
      finalize(() => {
        if (this.IdData) {
          this.setRegiste(this.IdData)
        } else if (dataadopcion) {
          this.setdata(dataadopcion);
        }
      })
    ).subscribe((res) => {
      this.animaldata = res.data;
    });
  }


}
