import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../../interfaces/estudiante';
import { ActivatedRoute } from '@angular/router';
import { EstudianteService } from '../../services/estudiante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-estudiantes',
  templateUrl: './detalles-estudiantes.component.html',
  styleUrls: ['./detalles-estudiantes.component.css']
})
export class DetallesEstudiantesComponent implements OnInit {

  id:number;
  estudiante:Estudiante;

  constructor(
    private route:ActivatedRoute,
    private estudianteService:EstudianteService,
    ){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.estudiante = new Estudiante();
    this.estudianteService.obtenerEstudiantePorId(this.id).subscribe(dato => {
      this.estudiante = dato;
      Swal.fire(`Detalles del estudiante ${this.estudiante.name}`)
    })
  }
}
