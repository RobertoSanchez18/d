import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../../interfaces/estudiante';
import { EstudianteService } from '../../services/estudiante.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-actualizar-estudiante',
  templateUrl: './actualizar-estudiante.component.html',
  styleUrls: ['./actualizar-estudiante.component.css']
})
export class ActualizarEstudianteComponent implements OnInit {

  id:number;
  estudiante:Estudiante = new Estudiante();
  fechaNacimientoFormatted: string = '';


  //VALIDACIONES
  nameError: boolean = false;
  surnameError: boolean = false;
  documentError: boolean = false;
  documentErrorMessage: string = '';
  emailError: boolean = false;
  celphoneError: boolean = false;

  constructor(private estudianteService:EstudianteService, private router:Router, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.estudianteService.obtenerEstudiantePorId(this.id).subscribe(dato => {
      this.estudiante = dato;
    },error => console.log(error));
  }


  irAlaListaDeEstudiantes(){
    const aulaId = this.estudiante.classroomId;
    this.router.navigate(['/salon', aulaId]);
    Swal.fire('Estudiante actualizado',`El estudiante ${this.estudiante.name} ha sido actualizado con exito`,`success`);
  }

  onSubmit(){

    if(this.validateForm()) {
      this.estudianteService.actualizarEstudiante(this.id,this.estudiante).subscribe(dato => {
        this.irAlaListaDeEstudiantes()});
    } else {
      this.showErrorAlert();
    }
    
  }

   //validaciones 

  //NAME
  onNameChange() {
    this.estudiante.name = this.estudiante.name.toUpperCase();
    this.validateName();
  }

  validateName() {
    this.nameError = !/^[a-zA-Z ]*$/.test(this.estudiante.name);
  }

  //SURNAME
  onSurnameChange() {
    this.estudiante.surname = this.estudiante.surname.toUpperCase();
    this.validateSurname();
  }

  validateSurname() {
    this.surnameError = !/^[a-zA-Z ]*$/.test(this.estudiante.surname);
  }

  //TIPO DE DOCUMENTO
  onTypeDocumentChange() {
    this.validateDocument();
  }

  validateDocument() {
    const typeDocument = this.estudiante.typeDocument;
    const documentValue = this.estudiante.numberDocument;

    if (typeDocument === 'CNE') {
        this.documentError = documentValue.length !== 12 || !/^\d{12}$/.test(documentValue);
        this.documentErrorMessage = 'El número de documento debe tener 12 dígitos.';
    } else if (typeDocument === 'DNI') {
        this.documentError = documentValue.length !== 8 || !/^\d{8}$/.test(documentValue);
        this.documentErrorMessage = 'El número de documento debe tener 8 dígitos.';
    } else {
        // Puedes agregar lógica para otros tipos de documentos si es necesario
        this.documentError = false;
        this.documentErrorMessage = '';
    }
  } 

  //EMAIL
  onEmailChange() {
    this.validateEmail();
  }

  validateEmail() {
    const emailValue = this.estudiante.email;

    this.emailError = !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue);
  }

  //CELULAR
  onCelphoneChange() {
    this.validateCelphone();
  }

  validateCelphone() {
    const celphoneValue = this.estudiante.celphone;

    this.celphoneError = !/^[9]\d{8}$/.test(celphoneValue);
  }


  clearDocumentError() {
    this.documentError = false;
    this.documentErrorMessage = '';
  }



  validateForm(): boolean {
    this.validateName();
    this.validateSurname();
    this.validateDocument();
    this.validateEmail()

    const turnoValid = !!this.estudiante.shift; // Verifica que turno no esté vacío
    const fechaNacimientoValid = !!this.estudiante.dateOfBirth; // Verifica que fecha de nacimiento no esté vacío


    return (
      !this.nameError &&
      !this.surnameError &&
      !this.documentError &&
      turnoValid &&
      fechaNacimientoValid
    );
  }

  showErrorAlert() {
    Swal.fire('Error', 'Por favor, verifica los campos del formulario.', 'error');
  }

  getDocumentPattern(): string {
    return this.estudiante.typeDocument === 'CNE' ? '\\d{12}' : '\\d{8}';
  }
}
