import { HttpClient } from '@angular/common/http';
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
import { UpdateDoctor } from '../models/update-doctor.model';

@Injectable({
  providedIn: 'root'
})
export class AdminUpdateService {

  apiUrl = "http://localhost:5000/api";

  constructor(private http : HttpClient) { }

  updateCity(cityId : number, updatedCity : City) {
    return this.http.put(`${this.apiUrl}/Cities?id=${cityId}`,updatedCity);
  }

  updateCountry(countryId : number, updatedCountry : Country) {
    return this.http.put(`${this.apiUrl}/Countries?id=${countryId}`,updatedCountry);
  }

  updateDistrict(districtId : number, updatedDistrict : District) {
    return this.http.put(`${this.apiUrl}/Districts?id=${districtId}`,updatedDistrict);
  }

  updateHospital(hospitalId : number, updatedHospital : Hospital) {
    return this.http.put(`${this.apiUrl}/Hospitals?id=${hospitalId}`,updatedHospital);
  }

  updateDoctor(doctorId : number, updatedDoctor : UpdateDoctor) {
    return this.http.put(`${this.apiUrl}/Doctors?id=${doctorId}`,updatedDoctor);
  }

  updateDepartment(deptId : number, updatedDept : Department) {
    return this.http.put(`${this.apiUrl}/Departments?id=${deptId}`,updatedDept);
  }

  updateDisease(diseaseId : number, updatedDisease : Disease) {
    return this.http.put(`${this.apiUrl}/Diseases?id=${diseaseId}`,updatedDisease);
  }

  updateDegree(degreeId : number, updatedDegree : Degree) {
    return this.http.put(`${this.apiUrl}/Degrees?id=${degreeId}`,updatedDegree);
  }
}
