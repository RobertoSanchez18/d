import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aula } from '../interfaces/aula';
import { Estudiante } from '../interfaces/estudiante';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  private apiClassRooms = 'http://localhost:8085/classkeeper/v1/classrooms'

  constructor(private http: HttpClient) { }

  getClassrooms(): Observable<any[]> {
    return this.http.get<any[]>(this.apiClassRooms)
  }

  getClassroomsAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiClassRooms}/all`)
  }

  getClassroomsPrimary(): Observable<Aula[]>{
    return this.http.get<Aula[]>(`${this.apiClassRooms}/primaria`);
  }

  postClassrooms(aula: Aula) {
    return this.http.post<Aula>(this.apiClassRooms, aula);
  }


  actualizarAula(id:number,aula:Aula) : Observable<Object>{
    return this.http.put(`${this.apiClassRooms}/${id}`, aula);
  }

  obtenerAulaPorId(id:number):Observable<Aula>{
    return this.http.get<Aula>(`${this.apiClassRooms}/${id}`);
  }

  eliminarAula(id:number):Observable<Object>{
    return this.http.delete(`${this.apiClassRooms}/${id}`);
  }

  getActiveStudentsByClassroomId(classroomId: number): Observable<Estudiante[]> {
    const url = `${this.apiClassRooms}/${classroomId}/students`;
    return this.http.get<Estudiante[]>(url);
  }

  obtenerEstudiantesPorAulaId(id: number): Observable<Estudiante[]> {
    const url = `${this.apiClassRooms}/${id}/students`;
    return this.http.get<Estudiante[]>(url);
  }

  getStudentCounts(): Observable<{ [key: number]: number }> {
    const url = `${this.apiClassRooms}/estudiantes/count`;  // Ajusta la URL según tu API
    return this.http.get<{ [key: number]: number }>(url);
  }

}
