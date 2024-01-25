import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class VoluntariadoService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllApadrinamiento(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/voluntario`);
  }


  AddApadrinamiento(voluntario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/voluntario`, voluntario);
  }

  updateApadrinamiento(voluntario: any, idAVoluntario: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/voluntario/${idAVoluntario}`, voluntario);
  }
}

//Interfaces

export interface GetAllVoluntariado {
  idVoluntario: number
  nombre: string
  apellido: string
  fechaNac: string
  edad: string
  ciudad: string
  ocupacion: string
  correo: string
  direccion: string
  motivo: string
  idEstado: any
  idEstadoNavigation: any
}

export interface AddVoluntariado {
  nombre: string
  apellido: string
  fechaNac: string
  edad: string
  ciudad: string
  ocupacion: string
  correo: string
  direccion: string
  motivo: string
}

export interface EditVoluntariado {
  nombre: string
  apellido: string
  fechaNac: string
  edad: string
  ciudad: string
  ocupacion: string
  correo: string
  direccion: string
  motivo: string
  idEstado: number
}
