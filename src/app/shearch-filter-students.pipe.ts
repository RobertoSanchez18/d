import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shearchFilterStudents'
})
export class ShearchFilterStudentsPipe implements PipeTransform {

  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    searchTerm = searchTerm.toUpperCase();

    return items.filter(item => {
      // Personaliza esta lógica según los campos que deseas buscar
      return (
        item.name.toUpperCase().includes(searchTerm) ||
        item.surname.toUpperCase().includes(searchTerm) ||
        (item.typeDocument === 'DNI' ? 'DNI' : 'CNE').toUpperCase().includes(searchTerm) ||
        item.numberDocument.toLowerCase().includes(searchTerm) 
      );
    });
  }

}
