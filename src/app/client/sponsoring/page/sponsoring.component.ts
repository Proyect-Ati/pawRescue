import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AnimalI } from 'src/app/shared/interfaces';
import { healthStatusPets } from '../../../shared/enums/enums';
import { PetService } from '../../services/pet.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ApadrinamientoAddComponent } from 'src/app/admin/Components/component-apadrinamiento/pages/apadrinamiento-add/apadrinamiento-add.component';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-sponsoring',
  templateUrl: './sponsoring.component.html',
  styleUrls: ['./sponsoring.component.scss'],
})
export class SponsoringComponent implements OnInit {
  button = 'Apadrinar';
  statusHealthy = 0;
  loadingPets = true;
  constructor(
    private petService: PetService,
    public dialog: MatDialog,
    private _snackBar: SnackbarService,

  ) {
    this.statusHealthy = healthStatusPets.Deceased;
  }

  pets: AnimalI[] = [];

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

  errorImg(err: any, pet: AnimalI) {
    pet.loadingImg = true;
    err.target.src = '../../../assets/imagenes/placeholders.jpeg';
  }

  openModal(petData: AnimalI): void {
    const dialogRef: MatDialogRef<ApadrinamientoAddComponent> = this.dialog.open(ApadrinamientoAddComponent, {
      data: petData,
      width: '800px',
      maxHeight: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === '201') {
        this.dialog.open(ModalComponent, {
          maxWidth: '40vw',
          data: {
            title: 'Gracias por Apadrinar',
            message:
              'En los próximos días te enviaremos un correo electrónico con los datos bancarios para que realices la transferencia.',
            img: 'data:image/png;base64,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',
          },
        });
      }
    });




  }
}
