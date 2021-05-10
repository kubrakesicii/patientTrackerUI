import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../models/city.model';
import { Country } from '../models/country.model';
import { Degree } from '../models/degree.model';
import { Department } from '../models/department.model';
import { Disease } from '../models/disease.model';
import { District } from '../models/district.model';
import { Doctor } from '../models/doctor.model';
import { Hospital } from '../models/hospital.model';
import { PostDoctor } from '../models/post-doctor.model';

@Injectable({
  providedIn: 'root'
})
export class AdminPostService {
  
  apiUrl = 'https://localhost:5001/api';


  constructor(private http : HttpClient) { }

  addCountry(countryModel : Country){
    return this.http.post(`${this.apiUrl}/Countries`, countryModel);
  }

  addCity(cityModel : City){
    return this.http.post(`${this.apiUrl}/Cities`, cityModel);
  }

  addDistrict(districtModel : District){
    return this.http.post(`${this.apiUrl}/Districts`, districtModel);
  }

  
  addHospital(hospitalModel : Hospital) {
    return this.http.post(`${this.apiUrl}/Hospitals`,hospitalModel)
  }


  addDoctor(doctorModel : PostDoctor) {
    return this.http.post(`${this.apiUrl}/Doctors`, doctorModel);
  }

  addDepartment(deptModel : Department) {
    return this.http.post(`${this.apiUrl}/Departments`, deptModel);
    //department modelindeki hospitalId yerine, tıkladıgımda aldıgım değer atanacak,kullanıcdan sadece desc al.
  }

  addDisease(diseaseModel : Disease) {
    return this.http.post(`${this.apiUrl}/Diseases`, diseaseModel);
  }

  addDegree(degreeModel : Degree) {
    return this.http.post(`${this.apiUrl}/Degrees`, degreeModel);
  }
}
