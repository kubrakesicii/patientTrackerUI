import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminDeleteService {

  apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  deleteCountry(countryId : number) {
    return this.http.delete(`${this.apiUrl}/Countries/${countryId}`);
  }

  deleteCity(cityId : number) {
    return this.http.delete(`${this.apiUrl}/Cities/${cityId}`);
  }

  deleteDistrict(districtId : number) {
    return this.http.delete(`${this.apiUrl}/Districts/${districtId}`);
  }

  deleteHospital(hospitalId : number) {
    return this.http.delete(`${this.apiUrl}/Hospitals/${hospitalId}`);
  }

  deleteDegree(degreeId : number) {
    return this.http.delete(`${this.apiUrl}/Degrees/${degreeId}`);
  }

  deleteDoctor(doctorId : number) {
    return this.http.delete(`${this.apiUrl}/Doctors/${doctorId}`);
  }

  deleteDepartment(deptId : number) {
    return this.http.delete(`${this.apiUrl}/Departments/${deptId}`);
  }

  deleteDisease(diseaseId : number) {
    return this.http.delete(`${this.apiUrl}/Diseases/${diseaseId}`);
  }

}
