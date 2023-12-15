import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Chart, { ChartType } from 'chart.js/auto'
import { EstudianteService } from 'src/app/services/estudiante.service';
import { AttendanceService } from 'src/app/services/attendance.service';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  public chart: Chart;
  totalUsers: number;
  totalUsersInactives: number;
  totalEstudiantes: number;

  totalAsistenciasPresente: number;
  totalAsistenciasAusente: number;

  constructor(private userService: UserService, private studentService: EstudianteService, private attendanceService: AttendanceService){}


  ngOnInit(): void {
    this.graficoCircularUsuarios() 
    this.graficoCircularAsistencia() 
  }
    
  graficoCircularUsuarios(){
    this.userService.getUsers().subscribe(users => {
      this.totalUsers = users.length;

      this.userService.getUsersInactivos().subscribe(usersInactives => {
        this.totalUsersInactives = usersInactives.length;

        const data = {
          labels: [
            'Usuarios Activos',
            'Usuarios Inactivos',
          ],
          datasets: [{
            label: 'Usuarios',
            data: [this.totalUsers, this.totalUsersInactives],
            backgroundColor: [
              'rgb(54, 162, 235)',
              'rgb(255, 99, 132)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
          }],
        };

        this.chart = new Chart("chart", {
          type: 'doughnut' as ChartType,
          data
        });
      });
    });
  }

  graficoCircularAsistencia(){
    this.attendanceService.getAllAttendance().subscribe(dato => {
      const totalAsistencias = dato.length;

      const asistenciaPresente = dato.filter(present => present.states === 'P')
      const asistenciaAusente = dato.filter(ausent => ausent.states === 'A')

      this.totalAsistenciasPresente = asistenciaPresente.length
      this.totalAsistenciasAusente = asistenciaAusente.length

      const porcentajePresente = (this.totalAsistenciasPresente / totalAsistencias) * 100;
      const porcentajeAusente = (this.totalAsistenciasAusente / totalAsistencias) * 100;

      const data = {
        labels: [
          'Total Alumnado Presente',
          'Total Alumnado Ausente',
        ],
        datasets: [{
          label: 'Alumnado',
          data: [porcentajePresente, porcentajeAusente],
          backgroundColor: [
            '#DB3A34',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }],
      };

      this.chart = new Chart("chart2", {
        type: 'pie' as ChartType,
        data
      });

    })
  }
  

}

