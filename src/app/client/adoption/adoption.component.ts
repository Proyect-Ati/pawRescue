import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AnimalI } from 'src/app/shared/interfaces';
import { healthStatusPets } from 'src/app/shared/enums/enums';
import { PetService } from '../services/pet.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdopcionAddComponent } from 'src/app/admin/Components/componente-adopcion/pages/adopcion-add/adopcion-add.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { State } from 'src/app/admin/Components/componente-adopcion/adopcion-form/adopcion-form.component';

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.scss'],
})
export class AdoptionComponent implements OnInit {
  button = 'Adoptar';
  pets: AnimalI[] = [];
  healthStatus = 0;
  stateanimal: State[] = [];
  petsActivo: AnimalI[] = [];
  loadingPets = true;

  constructor(
    private petService: PetService,
    public dialog: MatDialog,
    private _snackBar: SnackbarService,
  ) {
    this.healthStatus = healthStatusPets.Deceased;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getMascotas();
    }, 2000);
  }

  getMascotas() {
    this.petService.getAnimals().subscribe({
      next: (element) => {
        this.pets = element.data.map((pet) => {
          return {
            ...pet,
            loadingImg: false,
            errorImg: false,
          };
        });
        this.loadingPets = false;
        this.getEstados();
      },
    });
  }

  loadingImg(loadingId: number) {
    setTimeout(() => {
      this.pets = this.pets.map((x) => {
        if (loadingId === x.idAnimal) {
          x.loadingImg = true;
        }
        return x;
      });
    }, 1000);
  }
  Adoptar(event: any) {
    const dialogRef: MatDialogRef<AdopcionAddComponent> = this.dialog.open(
      AdopcionAddComponent,
      {
        data: event,
        width: '800px',
        maxHeight: '700px',
      },
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result === '201') {
        this._snackBar.sucess('Aviso', 'Registro guardado correctamente.');
      } else {
        this._snackBar.danger(
          'Error',
          'Oops! Algo salió mal al intentar agregar el registro. Por favor, inténtalo de nuevo.',
        );
      }
    });
  }
  errorImg(err: any, pet: AnimalI) {
    pet.loadingImg = true;
    err.target.src = '../../../assets/imagenes/placeholders.jpeg';
  }

  getEstados(): void {
    this.petService.GetEstados().subscribe((res) => {
      this.stateanimal = res.data;
      this.valdiate();
    });
  }

  valdiate(): any {
    const estado = 'Activo';
    const estate = [...this.stateanimal].find(
      (state) => state.estadoDesc === estado,
    );
    let value2 = estate?.idEstado;
    this.petsActivo = this.pets?.filter((pet) => pet.idEstado === value2);
  }
}
