import { Pipe, PipeTransform } from '@angular/core';
import { Hospital } from '../models/hospital.model';

@Pipe({
  name: 'searchPipe',
})
export class SearchPipe implements PipeTransform {
  transform(value: Hospital[], filterText?: string): Hospital[] {
    if (!value || !filterText) {
      return value;
    }
    // return value.filter(
    //   (x: Hospital) => x.description.indexOf(filterText) !== -1
    // );
    return value.filter((x: Hospital) =>
      x.description.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
    );

    //   return filterText
    //     ? value.filter((x: Hospital) => x.description.indexOf(filterText) !== -1)
    //     : value;
    // }
  }
}
