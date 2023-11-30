import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aula } from 'src/app/interfaces/aula';
import { Usuario } from 'src/app/interfaces/usuario';
import { AulaService } from 'src/app/services/aula.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-aula-secundaria',
  templateUrl: './agregar-aula-secundaria.component.html',
  styleUrls: ['./agregar-aula-secundaria.component.css']
})
export class AgregarAulaSecundariaComponent implements OnInit {

  aula: Aula = new Aula();
  usuario: Usuario[]= [];

  constructor(
    private aulaService:AulaService,
    private router:Router,
    private usuarioService: UserService,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    console.log(this.aula);
    this.getUsers();
  }

  //Trae a los usuarios actibos
  getUsers(){
    this.usuarioService.getUsers().subscribe(dato => {
      this.usuario = dato;
    })
  }

  //Guarda el aula para ser enviado al servidor
  guardarAula(){
    this.aula.turno ='S';
    this.aulaService.postClassrooms(this.aula).subscribe(dato => {
      console.log(dato);
      this.irListaAulas();
    }, error => {
      console.error(error);
      Swal.fire('Error', 'Hubo un problema al agregar el aula', 'error');
    })
  }


  //Redirecciona a la lista de aulas de secundaria
  irListaAulas(){
    this.router.navigate(['/aulas/secundaria']);
    Swal.fire('Aula agregada',`El aula ha sido registrado con exito`,`success`);
  }

  //Recibe el formulario
  onSubmit(){
    if (!this.aula.grado || !this.aula.seccion || !this.aula.user) {
      Swal.fire('Error',`Por Favor, llene los campos`,`error`);
    } else {
      this.guardarAula();
    }

  }


}
