import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aula } from 'src/app/interfaces/aula';
import { Usuario } from 'src/app/interfaces/usuario';
import { AulaService } from 'src/app/services/aula.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aulas-primaria',
  templateUrl: './aulas-primaria.component.html',
  styleUrls: ['./aulas-primaria.component.css']
})
export class AulasPrimariaComponent implements OnInit {

  aula: Aula[] = [];

  usuarios: Usuario[] =[];

  constructor(private aulaService: AulaService, private router: Router, private usuarioService: UserService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.fetchData();
    this.cargarUsuarios();
  }

  fetchData(){
    this.getClassroomsPrimary();
  }

  private getClassroomsPrimary(){
    this.aulaService.getClassroomsPrimary().subscribe(dato => {
      this.aula = dato;
      console.log(dato)
    })
  }

  cargarUsuarios(){
    this.usuarioService.getUsers().subscribe(dato => {
      this.usuarios = dato;
    })
  }

  traerEstudiantes(id:number){
    this.router.navigate(['salon',id]);
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
          this.getClassroomsPrimary();
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

  getNombreUsuarioPorId(userId: number): string {
    const usuario: Usuario | undefined = this.usuarios.find(usuario => usuario.id === userId);
    return usuario ? `${usuario.name}-${usuario.surname}` : '';
  }
}
