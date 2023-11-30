import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aula } from 'src/app/interfaces/aula';
import { Usuario } from 'src/app/interfaces/usuario';
import { AulaService } from 'src/app/services/aula.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-aula',
  templateUrl: './actualizar-aula.component.html',
  styleUrls: ['./actualizar-aula.component.css']
})
export class ActualizarAulaComponent implements OnInit{

  id:number
  aula: Aula = new Aula()
  usuario: Usuario[] = []


  constructor(private router: Router, private aulaService: AulaService, private route: ActivatedRoute, private usuarioService: UserService){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.aulaService.obtenerAulaPorId(this.id).subscribe(dato => {
      this.aula = dato
      console.log(dato)
    })

    this.getUsers()
  }

  getUsers(){
    this.usuarioService.getUsers().subscribe(dato => {
      this.usuario = dato;
    })
  }

  irListaAulas(){
    this.router.navigate(['/aulas/secundaria']);
    Swal.fire('Aula actualizado',`El aula ha sido actualizado con exito`,`success`);
  }


  onSubmit(){
    this.aulaService.actualizarAula(this.id, this.aula).subscribe(dato => {
      this.irListaAulas()
    })
  }

  compareFn(item1: any, item2: any): boolean {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
}

}
