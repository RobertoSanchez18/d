import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../services/estudiante.service';
import { Estudiante } from 'src/app/interfaces/estudiante';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

 
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  estudiantes: Estudiante[] = [];

  public page!: number;


  constructor(private estudianteService: EstudianteService, private router:Router) { }

  ngOnInit() {
    this.obtenerEstudiantes();
  }

  //Listar estudiantes
  private obtenerEstudiantes(){
    this.estudianteService.getData().subscribe(dato => {
      this.estudiantes = dato;
    })
  }

  //Actualizar Estudiantes
  actualizarEstudiante(id:number){
    this.router.navigate(['actualizar-estudiante',id]);
  }

  async eliminarEstudiante(id:number){
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Confirma si deseas eliminar al estudiante',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#FF2849',
      confirmButtonText: 'Confirmar',
      buttonsStyling: true
    });

    if (result.isConfirmed) {
      this.estudianteService.eliminarEstudianteLogico(id).subscribe(
        dato => {
          console.log(dato);
          this.obtenerEstudiantes();
          Swal.fire(
            'Estudiante eliminado',
            'El estudiante ha sido eliminado con éxito',
            'success'
          );
        },
        error => {
          console.error(error);
          Swal.fire(
            'Error',
            'Ocurrió un error al eliminar el estudiante',
            'error'
          );
        }
      );
    }
  }

  verDetallesEstudiante(id:number){
    this.router.navigate(['detalles-estudiante', id]);
  }

}
