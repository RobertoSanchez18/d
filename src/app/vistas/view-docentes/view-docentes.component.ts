import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-docentes',
  templateUrl: './view-docentes.component.html',
  styleUrls: ['./view-docentes.component.css']
})
export class ViewDocentesComponent implements OnInit {

  docentes: Usuario[] = [];

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.getDocente();
  }

  getDocente(){
    this.userService.getUsers().subscribe(dato => {
      const docente = dato.filter(dato => dato.rol === 'D');
      
      this.docentes = docente;
      console.log(docente)
    })
  }

}
