import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuario: Usuario[] = [];
  filtro: string = '';
  searchTerm: string = '';

  public page!: number;

  constructor(private usuarioService: UserService, private router: Router){}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  private obtenerUsuarios(){
    this.usuarioService.getUsers().subscribe(dato =>{
      this.usuario = dato;
    })
  }

  actualizarUsuario(id:number){
    this.router.navigate(['actualizar-usuario',id]);
  }

  async eliminarUsuario(id:number){
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Confirma si deseas eliminar al usuario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#FF2849',
      confirmButtonText: 'Confirmar',
      buttonsStyling: true
    });

    if (result.isConfirmed) {
      this.usuarioService.eliminarUsuarioLogico(id).subscribe(
        dato => {
          console.log(dato);
          this.obtenerUsuarios();
          Swal.fire(
            'Usuario eliminado',
            'El usuario ha sido eliminado con éxito',
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
