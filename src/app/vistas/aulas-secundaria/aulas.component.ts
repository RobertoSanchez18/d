import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aula } from 'src/app/interfaces/aula';
import { Estudiante } from 'src/app/interfaces/estudiante';
import { Usuario } from 'src/app/interfaces/usuario';
import { AulaService } from 'src/app/services/aula.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.component.html',
  styleUrls: ['./aulas.component.css']
})
export class AulasComponent implements OnInit {

  data: Aula[] = [];
  estudiante: Estudiante[] = [];
  usuarios: Usuario[] =[];
 

  constructor(private aulaService: AulaService, private router: Router, private usuarioService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getClassroomsSecondary()
    this.loadUsuario()
  }

  loadUsuario(){
    this.usuarioService.getUsers().subscribe(usuarios =>{
      this.usuarios = usuarios;
    })
  }

  getClassroomsSecondary() {
    this.aulaService.getClassrooms().subscribe((dato:Aula[]) => {
      this.data = dato;
      console.log(dato)
    })
  }

  traerEstudiantes(id:number){
    this.router.navigate(['salon',id]);
  }

  editAula(id:number) {
    this.router.navigate(['aulas/secundaria/actualizar', id])
  }

  async eliminarAula(id:number){
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Confirma si deseas eliminar el aula',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#FF2849',
      confirmButtonText: 'Confirmar',
      buttonsStyling: true
    });

    if (result.isConfirmed) {
      this.aulaService.eliminarAula(id).subscribe(
        dato => {
          console.log(dato);
          this.getClassroomsSecondary();
          Swal.fire(
            'Aula eliminado',
            'El aula ha sido eliminado con éxito',
            'success'
          );
        },
        error => {
          console.error(error);
          Swal.fire(
            'Error',
            'Ocurrió un error al eliminar el aula',
            'error'
          );
        }
      );
    }
  }

}
