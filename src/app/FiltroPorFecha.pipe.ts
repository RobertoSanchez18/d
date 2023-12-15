import { Pipe, PipeTransform } from '@angular/core';
import { Attendance } from './interfaces/estudiante';

@Pipe({
  name: 'FiltroPorFecha'
})
export class FiltroPorFechaPipe implements PipeTransform {

  transform(asistencias: Attendance[], fechaFiltro: string): Attendance[] {
    if (!fechaFiltro) {
      return asistencias;
    }

    const fechaSeleccionada = new Date(fechaFiltro);
    fechaSeleccionada.setHours(0, 0, 0, 0);

    return asistencias.filter(asistencia => {
      const fechaAsistencia = new Date(asistencia.dates);
      fechaAsistencia.setHours(0, 0, 0, 0);

      return fechaAsistencia.getTime() === fechaSeleccionada.getTime();
    });

  }
}
