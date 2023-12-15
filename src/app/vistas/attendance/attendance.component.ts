import { Component, OnInit } from '@angular/core';
import { Aula } from 'src/app/interfaces/aula';
import { Attendance, AttendancePost, Estudiante } from 'src/app/interfaces/estudiante';
import { Usuario } from 'src/app/interfaces/usuario';
import { AttendanceService } from 'src/app/services/attendance.service';
import { AulaService } from 'src/app/services/aula.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  
  students: Estudiante[] = [];
  aulas: Aula[] = [];
  usuarios: Usuario[] = [];

  listaAsistencia: Attendance[] = [];
  aulaSeleccionada: number = 1; 

  newAsistencias : AttendancePost[] = [];

  asistenciasMarcadas: boolean[] = [];

  constructor(private studentService: EstudianteService, private attendanceService: AttendanceService, private aulaService: AulaService, private userService: UserService){}

  ngOnInit() {
    this.traerUsuario()
    this.traerAulas()
    this.traerEstudiantes();
  }

  marcarAsistencia(event: any, student: Estudiante) {
    // Puedes usar el evento (event) para verificar si el checkbox está marcado o no
    const asistenciaMarcada = event.target.checked;
    console.log(`Asistencia marcada para ${student.name} ${student.surname}. Estado: ${asistenciaMarcada ? 'Presente' : 'Ausente'}`);
  }

  insertarAsistencia(){
    const asistenciasSeleccionadas: AttendancePost[] = [];

  for (let i = 0; i < this.students.length; i++) {
    const asistencia: AttendancePost = {
      id: 0,
      states: this.asistenciasMarcadas[i] ? 'P' : 'A',
      dates: this.obtenerFechaActual(),
      student: {
        id: this.students[i].id
      }
    };
    asistenciasSeleccionadas.push(asistencia);
  }

  // Llama al servicio para insertar las asistencias seleccionadas
  this.attendanceService.saveAttendance(asistenciasSeleccionadas).subscribe(
    resp => {
      console.log('Asistencias Insertadas', resp);
      Swal.fire('Exito', 'Se han registrado las asistencias correctamente', 'success');

      this.asistenciasMarcadas = Array(this.students.length).fill(false);
    },
    error => {
      console.error('Error al insertar asistencias', error);
    }
  );

    
  }

  obtenerFechaActual(): Date {
    return new Date();
  }

  traerEstudiantes(){
    this.aulaService.obtenerEstudiantesPorAulaId(this.aulaSeleccionada).subscribe(dato => {
      this.students = dato;

      this.asistenciasMarcadas = Array(this.students.length).fill(false);
    })
  }


  traerAulas(){
    this.aulaService.getClassrooms().subscribe(dato => {
      this.aulas = dato
    })
  }

  onAulaChange() {
    console.log('Aula seleccionada:', this.aulaSeleccionada);
    this.traerEstudiantes();
    // Puedes hacer lo que necesites con this.aulaSeleccionada aquí
  }

  traerUsuario(){
    this.userService.getUsers().subscribe(dato => {
      this.usuarios = dato;
    })
  }

}
