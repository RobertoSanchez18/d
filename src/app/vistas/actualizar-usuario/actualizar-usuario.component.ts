import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.css']
})
export class ActualizarUsuarioComponent implements OnInit {

  id:number;
  usuario:Usuario = new Usuario();

  //VALIDACIONES
  nameError: boolean = false;
  surnameError: boolean = false;
  documentError: boolean = false;
  documentErrorMessage: string = '';
  emailError: boolean = false;
  celphoneError: boolean = false;

  constructor(private usuarioService: UserService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.usuarioService.obtenerUsuarioPorId(this.id).subscribe(dato =>{
      this.usuario = dato;
    }, error => console.log(error));
  }

  irAlaListaDeUsuario(){
    this.router.navigate(['/usuarios']);
    Swal.fire('Usuario actualizado', `El usuario ${this.usuario.name} ha sido actualizado con exito`, 'success');
  }

  onSubmit(){
    if(this.validateForm()) {
      this.usuarioService.actualizarUsuario(this.id, this.usuario).subscribe(dato => {
        this.irAlaListaDeUsuario()});
    } else {
      this.showErrorAlert();
    }
  }

   //NAME
   onNameChange() {
    this.validateName();
  }

  validateName() {
    this.nameError = !/^[a-zA-Z ]*$/.test(this.usuario.name);
  }

  //SURNAME
  onSurnameChange() {
    this.validateSurname();
  }

  validateSurname() {
    this.surnameError = !/^[a-zA-Z ]*$/.test(this.usuario.surname);
  }

  //TIPO DE DOCUMENTO
  onTypeDocumentChange() {
    this.validateDocument();
  }

  validateDocument() {
    const typeDocument = this.usuario.typeDocument;
    const documentValue = this.usuario.numberDocument;

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
    const emailValue = this.usuario.email;

    this.emailError = !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue);
  }

  //CELULAR
  onCelphoneChange() {
    this.validateCelphone();
  }

  validateCelphone() {
    const celphoneValue = this.usuario.celphone;

    this.celphoneError = !/^\d{9}$/.test(celphoneValue);
  }


  clearDocumentError() {
    this.documentError = false;
    this.documentErrorMessage = '';
  }



  validateForm(): boolean {
    this.validateName();
    this.validateSurname();
    this.validateDocument();
    this.validateEmail();
    this.validateCelphone();

    const typeDocument = !!this.usuario.typeDocument;
    const rolValid = !!this.usuario.rol; // Verifica que turno no esté vacío
    const passwordValid = !!this.usuario.password; // Verifica que fecha de nacimiento no esté vacío

    return (
      !this.nameError &&
      !this.surnameError &&
      !this.documentError &&
      !this.emailError &&
      !this.celphoneError &&
      typeDocument &&
      rolValid &&
      passwordValid
    );
  }

  showErrorAlert() {
    Swal.fire('Error', 'Por favor, verifica los campos del formulario.', 'error');
  }

  getDocumentPattern(): string {
    return this.usuario.typeDocument === 'CNE' ? '\\d{12}' : '\\d{8}';
  }

}
