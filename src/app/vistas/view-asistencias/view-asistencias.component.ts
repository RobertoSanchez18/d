import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import html2canvas from 'html2canvas';
import { Attendance } from 'src/app/interfaces/estudiante';
import { AttendanceService } from 'src/app/services/attendance.service';
import * as jspdf from 'jspdf';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-view-asistencias',
  templateUrl: './view-asistencias.component.html',
  styleUrls: ['./view-asistencias.component.css']
})
export class ViewAsistenciasComponent implements OnInit {

  listaAsistencia: Attendance[] = [];
  fechaFiltro: string = '';
  public page!: number;

  constructor(private attendanceService: AttendanceService){}

  ngOnInit(): void {
    this.fechaFiltro = new Date().toISOString().split('T')[0];
    this.listarAsistencia();
  }


  listarAsistencia(){
    this.attendanceService.getAllAttendance().subscribe(dato => {
      this.listaAsistencia = dato;
    })
  }

  name = 'Asistencia.xlsx';
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
    const dataToExport = this.listaAsistencia; // Puedes cambiar esto según tu estructura de datos
    const csvContent = "data:text/csv;charset=utf-8," +
      "Nombre,Apellido,Estado,Fecha\n" +
      dataToExport.map(item => Object.values(item).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    FileSaver.saveAs(blob, 'estudiantes.csv');
  }


}
