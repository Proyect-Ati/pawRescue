import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { GetAllVoluntariado, VoluntariadoService } from 'src/app/client/services/voluntariado.service';
import { VoluntariadoAddComponent } from '../voluntariado-add/voluntariado-add.component';
import { VoluntariadoEditComponent } from '../voluntariado-edit/voluntariado-edit.component';


@Component({
  selector: 'app-voluntariado-list',
  templateUrl: './voluntariado-list.component.html',
  styleUrls: ['./voluntariado-list.component.scss']
})
export class VoluntariadoListComponent implements AfterViewInit {
  displayedColumns: string[] = ['acction', 'nombre', 'apadrinado', 'direccion', 'correo'];
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  nombreFilter: string = "";


  constructor(
    public dialog: MatDialog,
    private _snackBar: SnackbarService,
    private ServiceVoluntariado: VoluntariadoService,

  ) {

  }

  ngOnInit(): void {
    this.getvoluntariado();
  }

  getvoluntariado() {
    this.ServiceVoluntariado.getAllApadrinamiento().subscribe((res) => {
      this.dataSource.data = res.data;
      this.dataSource.paginator = this.paginator;

    });
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
    const filters = {
      nombre: this.nombreFilter,
    };
    const validFilters = Object.entries(filters)
      .filter(([key, value]) => value !== undefined && value !== null && value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    return JSON.stringify(validFilters);
  }




  // Editar Animal
  editAnimal(element: GetAllVoluntariado): void {
    const dialogRef: MatDialogRef<VoluntariadoEditComponent> = this.dialog.open(VoluntariadoEditComponent, {
      data: element.idVoluntario,
      width: '800px',
      maxHeight: '750px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === '200') {
        this._snackBar.sucess('Aviso', 'Registro editado correctamente.');
        this.getvoluntariado();
      } else if (result === '500') {
        this._snackBar.danger('Error', 'Oops! Algo salió mal al intentar editar el registro. Por favor, inténtalo de nuevo.');
      }
    });
  }
  // Agregar Animal
  addAnimal(): void {
    const dialogRef: MatDialogRef<VoluntariadoAddComponent> = this.dialog.open(VoluntariadoAddComponent, {
      width: '800px',
      maxHeight: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === '201') {
        this._snackBar.sucess('Aviso', 'Registro guardado correctamente.');
        this.getvoluntariado();
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
