import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Aula } from 'src/app/interfaces/aula';
import { Usuario } from 'src/app/interfaces/usuario';
import { AulaService } from 'src/app/services/aula.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-aula-primaria',
  templateUrl: './agregar-aula-primaria.component.html',
  styleUrls: ['./agregar-aula-primaria.component.css']
})
export class AgregarAulaPrimariaComponent implements OnInit {

  aula: Aula = new Aula();
  usuario: Usuario[] = [];

  constructor(private aulaService: AulaService, private router: Router, private usuarioService: UserService){}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.usuarioService.getUsers().subscribe(dato=> {
      this.usuario = dato;
    })
  }

  guardarAula() {
    this.aula.turno = 'P';
    this.aulaService.postClassrooms(this.aula).subscribe(dato => {
      console.log(dato);
      this.irListaAulas();
    }, error => {
      console.log(error);
      Swal.fire('Error', 'Hubo un problema al agregar el aula', 'error');
    })
  }

  irListaAulas(){
    this.router.navigate(['/aulas/primaria']);
    Swal.fire('Aula agregada', 'El aula ha sido registrado con exito', 'success');
  }

  onSubmit(){
    if (!this.aula.grado || !this.aula.seccion || !this.aula.user) {
      Swal.fire('Error',`Por Favor, llene los campos`,`error`);
    } else {
      this.guardarAula();
    }
  }

}
