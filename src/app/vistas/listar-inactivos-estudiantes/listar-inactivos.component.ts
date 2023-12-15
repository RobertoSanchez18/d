import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { Aula } from 'src/app/interfaces/aula';
import { Estudiante } from 'src/app/interfaces/estudiante';
import { AulaService } from 'src/app/services/aula.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import Swal from 'sweetalert2';
import * as jspdf from 'jspdf';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-listar-inactivos',
  templateUrl: './listar-inactivos.component.html',
  styleUrls: ['./listar-inactivos.component.css']
})
export class ListarInactivosComponent implements OnInit {

  estudiante: Estudiante[] = [];
  searchTerm: string = '';
  aulas: Aula[] = [];
  searchTerm2: string = '';
  public page!: number;

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
        item.numberDocument.toUpperCase().includes(searchTerm) ||
        item.name.trim().toUpperCase().includes(searchTerm) ||
        item.surname.trim().toUpperCase().includes(searchTerm) ||
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







  name = 'ExcelSheet.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('season-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

  exportToPdf() {
    const element = document.getElementById('season-tble'); // Reemplaza 'tuTablaId' con el ID de tu tabla
    if (element) {
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('reporte.pdf');
      });
    }
  }

  exportToCsv(): void {
    const dataToExport = this.estudiante; // Puedes cambiar esto según tu estructura de datos
    const csvContent = "data:text/csv;charset=utf-8," +
      "Tipo de documento,Dni / Cne,Nombres,Apellidos,Email,Acciones\n" +
      dataToExport.map(item => Object.values(item).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    FileSaver.saveAs(blob, 'estudiantes.csv');
  }
}
