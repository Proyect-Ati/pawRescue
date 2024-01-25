import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PetService } from 'src/app/client/services/pet.service';
import { TooltipPosition } from '@angular/material/tooltip';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ApadrinamientoService } from 'src/app/client/services/apadrinamiento.service';
import { ApadrinamientoEditComponent } from '../apadrinamiento-edit/apadrinamiento-edit.component';
import { ApadrinamientoAddComponent } from '../apadrinamiento-add/apadrinamiento-add.component';


@Component({
  selector: 'app-apadrinamiento-list',
  templateUrl: './apadrinamiento-list.component.html',
  styleUrls: ['./apadrinamiento-list.component.scss']
})
export class ApadrinamientoListComponent
  implements AfterViewInit {
  displayedColumns: string[] = ['acction', 'nombre', 'apadrinado', 'direccion', 'correo', 'telefono'];
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  nombreFilter: string = "";
  animalFilter: string = "";

  animals: any[] = [];

  constructor(private animalService: PetService,
    public dialog: MatDialog,
    private _snackBar: SnackbarService,
    private ServiceApadrinamiento: ApadrinamientoService,
  ) {

  }

  ngOnInit(): void {
    this.getAnimals();
    this.getAllApadriamiento();
  }

  getAllApadriamiento(): void {
    this.ServiceApadrinamiento.getAllApadrinamiento().subscribe((res) => {
      this.dataSource.data = res.data;
      this.dataSource.paginator = this.paginator;
    });
  }

  getAnimalsbyID(id: number): string {
    const estado = this.animals.find((animal) => animal.idAnimal === id);
    return estado ? estado.nombre : 'Desconocido';
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(column?: string): void {
    this.dataSource.filterPredicate = (data, filter) => {
      const filterObject = JSON.parse(filter);
      for (const key in filterObject) {
        if (filterObject.hasOwnProperty(key)) {
          const columnValue = String(data[key]).toLowerCase();
          const filterValue = String(filterObject[key]).toLowerCase();
          if (!columnValue.includes(filterValue)) {
            return false;
          }
        }
      }
      return true;
    };
    this.dataSource.filter = this.createFilter();
  }

  createFilter(): string {
    const animal = this.animals.find((animal) => animal.nombre.includes(this.animalFilter));
    const filters = {
      nombre: this.nombreFilter,
      idAnimal: animal ? animal.idAnimal : this.animalFilter,
    };
    const validFilters = Object.entries(filters)
      .filter(([key, value]) => value !== undefined && value !== null && value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    return JSON.stringify(validFilters);
  }

  getAnimals(): void {
    this.animalService.getAnimals().subscribe((res) => {
      this.animals = res.data;
    });
  }
  // Editar Animal
  editAnimal(element: any): void {
    const dialogRef: MatDialogRef<ApadrinamientoEditComponent> = this.dialog.open(ApadrinamientoEditComponent, {
      data: element.idApadrinamiento,
      width: '800px',
      maxHeight: '750px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === '200') {
        this._snackBar.sucess('Aviso', 'Registro editado correctamente.');
        this.getAnimals();
      } else if (result === '500') {
        this._snackBar.danger('Error', 'Oops! Algo salió mal al intentar editar el registro. Por favor, inténtalo de nuevo.');
      }
    });
  }
  // Agregar Animal
  addAnimal(): void {
    const dialogRef: MatDialogRef<ApadrinamientoAddComponent> = this.dialog.open(ApadrinamientoAddComponent, {
      width: '800px',
      maxHeight: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === '201') {
        this._snackBar.sucess('Aviso', 'Registro guardado correctamente.');
        this.getAnimals();
      } else {
        this._snackBar.danger('Error', 'Oops! Algo salió mal al intentar agregar el registro. Por favor, inténtalo de nuevo.');
      }
    });
  }

}



export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Elementos por página';
  override nextPageLabel = 'Siguiente página';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primera página';
  override lastPageLabel = 'Última página';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };
}
