import { Pipe, PipeTransform } from '@angular/core';
import { Hospital } from '../models/hospital.model';

@Pipe({
  name: 'searchPipe',
})
export class SearchPipe implements PipeTransform {
  transform(value: Hospital[], filterText?: string): Hospital[] {
    // filterText = filterText?filterText.toLocaleLowerCase()
    return filterText
      ? value.filter((x: Hospital) => x.description.indexOf(filterText) !== -1)
      : value;
  }
}
