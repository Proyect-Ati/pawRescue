import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PetService } from 'src/app/client/services/pet.service';
import { TooltipPosition } from '@angular/material/tooltip';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AdopcionesService } from 'src/app/client/services/adopciones.service';
import { AdopcionAddComponent } from '../adopcion-add/adopcion-add.component';
import { AdopcionEditComponent } from '../adopcion-edit/adopcion-edit.component';

@Component({
  selector: 'app-adopcion-list',
  templateUrl: './adopcion-list.component.html',
  styleUrls: ['./adopcion-list.component.scss'],
})
export class AdopcionListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'acction',
    'nombre',
    'nombreAnimal',
    'correo',
    'direccion',
    'idEstado',
  ];
  positionOptions: TooltipPosition[] = [
    'after',
    'before',
    'above',
    'below',
    'left',
    'right',
  ];
  position = new FormControl(this.positionOptions[0]);
  animaladoptado: any[] = [];
  StateSalud: any[] = [];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  loadingData = true;
  nombreFilter: string = '';
  AdoptadoFilter: string = '';
  estadoFilter: number | string = '';

  animals: any[] = [];
  stateanimal: any[] = [];
  constructor(
    private animalService: PetService,
    private adopcionService: AdopcionesService,
    public dialog: MatDialog,
    private _snackBar: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.getListAdopciones();
    this.getEstados();
    this.getAnimals();
  }
  //Filtros
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
    const filters = {
      nombre: this.nombreFilter,
      nombreAnimal: this.AdoptadoFilter,
      estadoAdopcion: this.estadoFilter,
    };

    const validFilters = Object.entries(filters)
      .filter(
        ([key, value]) => value !== undefined && value !== null && value !== '',
      )
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    return JSON.stringify(validFilters);
  }

  valdiateIcon(value: number): any {
    const FindEstudio = this.stateanimal.find(
      (stateanimal) => stateanimal.idEstado === value,
    );
    let validEstado = FindEstudio?.estadoDesc;
    if (validEstado === 'Aprobado') {
      return { value: false, icon: 'edit_square', style: 'color: #767474' };
    } else if (validEstado === 'Rechazado') {
      return { value: true, icon: 'visibility', style: 'color: #b2b1b1' };
    }

    return { value: false, icon: 'visibility', style: 'color: #767474' };
  }
  //Servicios

  getListAdopciones(): void {
    this.adopcionService.getAllAdopciones().subscribe((res) => {
      this.loadingData = false;
      this.dataSource.data = res.data;
      this.dataSource.paginator = this.paginator;
    });
  }

  getEstadoDesc(idEstado: number): string {
    const estado = this.stateanimal.find(
      (estado) => estado.idEstado === idEstado,
    );
    return estado?.estadoDesc != 'Creado' ? estado?.estadoDesc : 'Pendiente';
  }

  getAnimal(idtypeanimal: number): string {
    const estado = this.animaladoptado.find(
      (mascota) => mascota.idAnimal === idtypeanimal,
    );
    return estado ? estado.nombre : 'Desconocido';
  }

  //Listado de Mascota
  getAnimals(): void {
    this.animalService.getAnimals().subscribe((res) => {
      this.animaladoptado = res.data;
    });
  }
  getEstados(): void {
    this.animalService.GetEstados().subscribe((res) => {
      this.stateanimal = res.data;
    });
  }

  // Editar Animal
  editAdopcion(element: any): void {
    const dialogRef: MatDialogRef<AdopcionEditComponent> = this.dialog.open(
      AdopcionEditComponent,
      {
        data: element.idAdopcion,
        width: '800px',
        maxHeight: '750px',
      },
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result === '200') {
        this._snackBar.sucess('Aviso', 'Proceso realizado correctamente.');
        this.getListAdopciones();
      } else if (result === '500') {
        this._snackBar.danger(
          'Error',
          'Oops! Algo salió mal al intentar darle seguimiento. Por favor, inténtalo de nuevo.',
        );
      }
    });
  }
  // Agregar Animal
  addAdopcion(): void {
    const dialogRef: MatDialogRef<AdopcionAddComponent> = this.dialog.open(
      AdopcionAddComponent,
      {
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
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };
}
