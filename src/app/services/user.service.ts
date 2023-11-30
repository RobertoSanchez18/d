import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUsers = 'http://localhost:8085/classkeeper/v1/users';

  constructor(private http: HttpClient) { }

  //Listar Activos
  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUsers);
  }

  //Listar Inactivos
  getUsersInactivos(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.apiUsers}/inactives`);
  }

  //Insertar
  registrarUsuario(usuario:Usuario) : Observable<Object>{
    return this.http.post(this.apiUsers, usuario)
  }

  //Actualizar
  actualizarUsuario(id:number,usuario:Usuario) : Observable<Object>{
    return this.http.put(`${this.apiUsers}/${id}`, usuario);
  }

  //Listar por Id
  obtenerUsuarioPorId(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(`${this.apiUsers}/${id}`);
  }

  //Eliminado Fisico
  eliminarUsuarioPermanente(id:number):Observable<Object>{
    return this.http.delete(`${this.apiUsers}/${id}`);
  }

  //Eliminado Logico
  eliminarUsuarioLogico(id:number):Observable<Object>{
    return this.http.delete(`${this.apiUsers}/inactive/${id}`);
  }

  //Activar estudiante
  activarUsuario(id:number):Observable<Object>{
    return this.http.put(`${this.apiUsers}/active/${id}`, id);
  }


  getUsuarioPorId(userId: number): Observable<Usuario> {
    const url = `${this.apiUsers}/usuarios/${userId}`; 
    return this.http.get<Usuario>(url);
  }

  

}
