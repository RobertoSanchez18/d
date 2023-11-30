import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aula } from 'src/app/interfaces/aula';
import { Estudiante } from 'src/app/interfaces/estudiante';
import { AulaService } from 'src/app/services/aula.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-inactivos',
  templateUrl: './listar-inactivos.component.html',
  styleUrls: ['./listar-inactivos.component.css']
})
export class ListarInactivosComponent implements OnInit {

  estudiante: Estudiante[] = [];

  searchTerm: string = '';

  aulas: Aula[] = [];

  constructor(private estudianteService: EstudianteService, private router: Router, private route:ActivatedRoute, private aulaService: AulaService){}

  ngOnInit(): void {
    this.getStudentsInactives();
    this.cargarAulas();
  }

  private getStudentsInactives(){
    this.estudianteService.getInactivos().subscribe(dato => {
      this.estudiante = dato;
    })
  }
  
  activarStudent(id: number){
    this.estudianteService.activarEstudiante(id).subscribe(dato => {
      console.log(dato);
      this.getStudentsInactives();
      Swal.fire('Estudiante restaurado', `El estudiante ha sido restaurado con Exito`, 'success');
    })
  }

  cargarAulas(){
    this.aulaService.getClassroomsAll().subscribe(dato => {
      this.aulas = dato;
    })
  }

  async eliminarEstudiantePermanente(id:number){
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Confirma si deseas eliminar al estudiante permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#FF2849',
      confirmButtonText: 'Confirmar',
      buttonsStyling: true
    });

    if (result.isConfirmed) {
      this.estudianteService.eliminarEstudiantePermanente(id).subscribe(
        dato => {
          console.log(dato);
          this.getStudentsInactives();
          Swal.fire(
            'Estudiante eliminado',
            'El estudiante ha sido eliminado permanentemente con éxito',
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

  getNombreAulaPorId(classroomId: number): { nombreAula: string; turno: string } {
    const aula: Aula | undefined = this.aulas.find(aula => aula.id === classroomId);
  
    if (aula) {
      const turnoTexto = aula.turno === 'S' ? 'Secundaria' : 'Primaria';
      return { nombreAula: `${aula.grado}-${aula.seccion}`, turno: turnoTexto };
    } else {
      return { nombreAula: '', turno: '' };
    }
  }
}
