import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../models/city.model';
import { Country } from '../models/country.model';
import { Degree } from '../models/degree.model';
import { Department } from '../models/department.model';
import { Disease } from '../models/disease.model';
import { District } from '../models/district.model';
import { Doctor } from '../models/doctor.model';
import { PostDoctor } from '../models/post-doctor.model';

@Injectable({
  providedIn: 'root'
})
export class AdminPostService {
  
  apiUrl = 'https://localhost:5001/api';


  constructor(private http : HttpClient) { }

  addCountry(countryModel : Country){
    let headers = new HttpHeaders();
    headers = headers.append("Content-type" , "application/json");

    return this.http.post(`${this.apiUrl}/Countries`, countryModel, {headers : headers});
  }

  addCity(cityModel : City){
    let headers = new HttpHeaders();
    headers = headers.append("Content-type" , "application/json");

    return this.http.post(`${this.apiUrl}/Cities`, cityModel, {headers : headers});
  }

  addDistrict(districtModel : District){
    let headers = new HttpHeaders();
    headers = headers.append("Content-type" , "application/json");

    return this.http.post(`${this.apiUrl}/Districts`, districtModel, {headers : headers});
  }


  addDoctor(doctorModel : PostDoctor) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-type" , "application/json");

    return this.http.post(`${this.apiUrl}/Doctors`, doctorModel, {headers : headers});
  }

  addDepartment(deptModel : Department) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-type" , "application/json");

    return this.http.post(`${this.apiUrl}/Departments`, deptModel, {headers : headers});
    //department modelindeki hospitalId yerine, tıkladıgımda aldıgım değer atanacak,kullanıcdan sadece desc al.
  }

  addDisease(diseaseModel : Disease) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-type" , "application/json");

    return this.http.post(`${this.apiUrl}/Diseases`, diseaseModel, {headers : headers});
  }

  addDegree(degreeModel : Degree) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-type" , "application/json");

    return this.http.post(`${this.apiUrl}/Degrees`, degreeModel, {headers : headers});
  }
}
