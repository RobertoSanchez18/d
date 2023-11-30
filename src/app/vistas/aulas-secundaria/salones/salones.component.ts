import * as XLSX from 'xlsx';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aula } from 'src/app/interfaces/aula';
import { Estudiante } from 'src/app/interfaces/estudiante';
import { AulaService } from 'src/app/services/aula.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-salones',
  templateUrl: './salones.component.html',
  styleUrls: ['./salones.component.css']
})
export class SalonesComponent implements OnInit {

  estudiante: Estudiante[] = [];
  aula : Aula;
  id:number;
  estudiantesCount: number;
  aulaId:number;

  public page!: number;

  searchTerm: string = '';
  searchTerm2: string = '';

  showFilterOptions = false; // Variable para controlar la visibilidad de los checkboxes
  filterOptions = [
    { label: 'DNI', value: 'DNI', checked: false },
    { label: 'CNE', value: 'CNE', checked: false },
    // Agrega más opciones según tus necesidades
  ];

  documentTypeFilter: string[] = [];

  updateFilters(): void {
    this.documentTypeFilter = this.filterOptions
      .filter(option => option.checked)
      .map(option => option.value);
  }

  getFilteredData(): any[] {
    if (!this.estudiante) {
      return [];
    }

    const searchTerm = this.searchTerm ? this.searchTerm.toUpperCase() : '';

    return this.estudiante.filter(item => {
      const matchesSearchTerm = (
        item.numberDocument.toLowerCase().includes(searchTerm) ||
        item.name.trim().toUpperCase().includes(searchTerm) ||
        item.surname.toLowerCase().includes(searchTerm) ||
        item.email.toLowerCase().includes(searchTerm) ||
        item.addres.toLowerCase().includes(searchTerm) 
      );
      
      if (this.documentTypeFilter.length === 0) {
        // No hay filtro de tipo de documento, devolver true
        return matchesSearchTerm;
      } else {
        // Verificar si el tipo de documento está en el filtro
        return matchesSearchTerm && this.documentTypeFilter.includes(item.typeDocument);
      }
    });
  }

  constructor(private aulaService: AulaService, private router: Router, private route: ActivatedRoute,private estudianteService: EstudianteService, private cdRef: ChangeDetectorRef){}

  ngOnInit(): void { 
    this.id = this.route.snapshot.params['id'];

    //Obtener el aula por Id
    this.aulaService.obtenerAulaPorId(this.id).subscribe(aula =>{
      this.aula = aula ;
    })

    this.obtenerAulaId();

    this.obtenerEstudiantesPorAula(this.id);
    
  }

  obtenerEstudiantesPorAula(id:number): void{
    this.obtenerAulaId();
    this.aulaService.obtenerEstudiantesPorAulaId(this.aulaId).subscribe(estudiantes => {
      this.estudiante = estudiantes
    })
  }

  //Actualizar Estudiantes
  actualizarEstudiante(id:number){
    this.router.navigate(['actualizar-estudiante',id]);
  }

  obtenerAulaId() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.aulaId = idParam ? +idParam : 0;
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
          this.router.navigate(['salon/', this.aulaId]);
          this.obtenerEstudiantesPorAula(id);
          this.cdRef.detectChanges();
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

  name = 'ExcelSheet.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('season-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

}
