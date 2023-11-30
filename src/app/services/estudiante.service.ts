import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from '../interfaces/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private apiStudents = 'http://localhost:8085/classkeeper/v1/students';

  constructor(private http: HttpClient) { }

  //Listar Activos
  getData(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiStudents);
  }

  //Listar Inactivos
  getInactivos(): Observable<Estudiante[]>{
    return this.http.get<Estudiante[]>(`${this.apiStudents}/inactives`);
  }

  //Insertar
  registrarEstudiante(estudiante:Estudiante) : Observable<Object>{
    return this.http.post(this.apiStudents, estudiante)
  }

  //Actualizar
  actualizarEstudiante(id:number,estudiante:Estudiante) : Observable<Object>{
    return this.http.put(`${this.apiStudents}/${id}`, estudiante);
  }

  //Listar por Id
  obtenerEstudiantePorId(id:number):Observable<Estudiante>{
    return this.http.get<Estudiante>(`${this.apiStudents}/${id}`);
  }

  //Eliminado Fisico
  eliminarEstudiantePermanente(id:number):Observable<Object>{
    return this.http.delete(`${this.apiStudents}/${id}`);
  }

  //Eliminado Logico
  eliminarEstudianteLogico(id:number):Observable<Object>{
    return this.http.delete(`${this.apiStudents}/inactive/${id}`);
  }

  //Activar estudiante
  activarEstudiante(id:number):Observable<Object>{
    return this.http.put(`${this.apiStudents}/active/${id}`, id);
  }

  getEstudiantesCountPorAula(aulaId: number): Observable<number> {
    const url = `${this.apiStudents}/estudiantes/count?aulaId=${aulaId}`;
    return this.http.get<number>(url);
  }

}
