import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBySearchTerm'
})
export class FilterBySearchTermPipe implements PipeTransform {

  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();

    return items.filter(item => {
      return (
        (item.typeDocument === 'DNI' ? 'DNI' : 'CNE').toLowerCase().includes(searchTerm) ||
        item.numberDocument.toLowerCase().includes(searchTerm) ||
        item.name.toLowerCase().includes(searchTerm) ||
        item.surname.toLowerCase().includes(searchTerm) ||
        item.email.toLowerCase().includes(searchTerm) ||
        item.address.toLowerCase().includes(searchTerm) ||
        (item.rol === 'A' ? 'Administrador' : 'Docente').toLowerCase().includes(searchTerm)
      )
    });
  }

}
