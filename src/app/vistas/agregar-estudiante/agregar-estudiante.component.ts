import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudiante } from 'src/app/interfaces/estudiante';
import { EstudianteService } from 'src/app/services/estudiante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-estudiante',
  templateUrl: './agregar-estudiante.component.html',
  styleUrls: ['./agregar-estudiante.component.css']
})
export class AgregarEstudianteComponent implements OnInit {

  estudiante : Estudiante = new Estudiante(); 
  opciones = ['Tarde', 'Mañana'];

  aulaId:number;

  //VALIDACIONES
  nameError: boolean = false;
  surnameError: boolean = false;
  documentError: boolean = false;
  documentErrorMessage: string = '';
  emailError: boolean = false;
  celphoneError: boolean = false;

  constructor(private estudianteService:EstudianteService,private router:Router,private route: ActivatedRoute){}


  ngOnInit(): void {
    console.log(this.estudiante)
    this.obtenerAulaId();
    console.log('ID del Aula:', this.aulaId);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  obtenerAulaId() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.aulaId = idParam ? +idParam : 0;
  }

  guardarEstudiante(){
    this.obtenerAulaId();

    this.estudiante.classroomId = this.aulaId;
    this.estudiante.states ='A';

    if (typeof this.estudiante.dateOfBirth === 'string') {
      this.estudiante.dateOfBirth = new Date(this.estudiante.dateOfBirth);
    }

  if (this.estudiante.dateOfBirth instanceof Date && !isNaN(this.estudiante.dateOfBirth.getTime())) {
    this.estudiante.dateOfBirth = this.formatDate(this.estudiante.dateOfBirth);

    this.estudianteService.registrarEstudiante(this.estudiante).subscribe(
      dato => {
        console.log(dato);
        this.irListaEstudiantes();
      }, error => {
        console.error(error);
        Swal.fire('Error', 'Hubo un problema al registrar el estudiante', 'error');
      }
    );
  } else {
    // Mostrar un mensaje de error si la fecha no es válida
    Swal.fire('Error', 'La fecha de nacimiento no es válida', 'error');
  }
  };

  irListaEstudiantes(){
    this.router.navigate(['/salon', this.aulaId])
    Swal.fire('Estudiante registrado',`El estudiante ${this.estudiante.name} ha sido registrado con exito`,`success`);
  }

  onSubmit(){
    this.validateDocument();

    if (this.validateForm()) {
        this.guardarEstudiante();
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
