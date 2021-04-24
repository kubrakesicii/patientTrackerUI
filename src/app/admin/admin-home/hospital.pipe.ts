import { Pipe, PipeTransform } from '@angular/core';
import { City } from '../models/city.model';
import { Hospital } from '../models/hospital.model';

@Pipe({
  name: 'hospital',
})
export class HospitalPipe implements PipeTransform {
  transform(value: City[], countryid?: number): City[] {
    return countryid
      ? value.filter((model) => model.countryId === countryid)
      : value;
  }
}
