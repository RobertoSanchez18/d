import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-usuarios-inactivos',
  templateUrl: './listar-usuarios-inactivos.component.html',
  styleUrls: ['./listar-usuarios-inactivos.component.css']
})
export class ListarUsuariosInactivosComponent implements OnInit {

  usuario: Usuario[]= [];
  searchTerm: string = '';

  constructor(private usuarioService: UserService, private router: Router){}

  ngOnInit(): void {
    this.getUsersInactives();
  }

  private getUsersInactives(){
    this.usuarioService.getUsersInactivos().subscribe(dato => {
      this.usuario = dato;
    })
  }

  activarUsuario(id:number){
    this.usuarioService.activarUsuario(id).subscribe(dato => {
      console.log(dato);
      this.getUsersInactives();
      Swal.fire('Usuario restaurado', `El usuario ha sido restaurado con Exito`, 'success');
    })
  }

  async eliminarUsuarioPermanente(id:number){
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Confirma si deseas eliminar al usuario permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#FF2849',
      confirmButtonText: 'Confirmar',
      buttonsStyling: true
    });

    if (result.isConfirmed) {
      this.usuarioService.eliminarUsuarioPermanente(id).subscribe(
        dato => {
          console.log(dato);
          this.getUsersInactives();
          Swal.fire(
            'Usuario eliminado',
            'El usuario ha sido eliminado permanentemente con éxito',
            'success'
          );
        },
        error => {
          console.error(error);
          Swal.fire(
            'Error',
            'Ocurrió un error al eliminar el usuario',
            'error'
          );
        }
      );
    }
  }


}
