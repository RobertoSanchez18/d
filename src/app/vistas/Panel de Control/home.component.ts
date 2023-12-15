import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  countDocentes: number;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.getDocentes();
  }

  getDocentes(){
    this.userService.getUsers().subscribe(dato => {

      const docentes = dato.filter(datos => datos.rol === 'D');

      this.countDocentes = docentes.length
    })
  }
 

}
