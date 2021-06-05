import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminGetService {
  apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  async getAllHospitals() {
    return this.http.get(this.apiUrl + '/Hospitals').toPromise();
  }

  async getAllCountries() {
    return this.http.get(this.apiUrl + '/Countries').toPromise();
  }
  async getAllCities() {
    return this.http.get(this.apiUrl + '/Cities/All').toPromise();
  }

  async getAllCities2() {
    return this.http.get(this.apiUrl + '/Cities/All2').toPromise();
  }

  async getAllDistricts() {
    return this.http.get(this.apiUrl + '/Districts/All').toPromise();
  }

  async getAllDepartments(hospitalId: any) {
    return this.http.get(`${this.apiUrl}/Departments/All`).toPromise();
  }

  async getAllDeptsByHospital(hospitalId: any) {
    return this.http
      .get(`${this.apiUrl}/Departments?hospitalId=${hospitalId}`)
      .toPromise();
  }

  async getAllDoctorsByHospital(hospitalId: any) {
    return this.http
      .get(`${this.apiUrl}/Doctors/ByHospital?hospitalId=${hospitalId}`)
      .toPromise();
  }

  async getAllDiseasesByHospital(hospitalId: any) {
    return this.http
      .get(`${this.apiUrl}/Diseases/ByHospital?hospitalId=${hospitalId}`)
      .toPromise();
  }

  async getAllDegrees() {
    return this.http.get(`${this.apiUrl}/Degrees`).toPromise();
  }
  
  async getCountryById(countryId : number) {
    return this.http.get(`${this.apiUrl}/Countries/${countryId}`).toPromise();
  }

  async getCityById(cityId : number) {
    return this.http.get(`${this.apiUrl}/Cities/${cityId}`).toPromise();
  }

  async getDistrictById(districtId : number) {
    return this.http.get(`${this.apiUrl}/Districts/${districtId}`).toPromise();
  }

  async getHospitalById(hospitalId : number) {
    return this.http.get(`${this.apiUrl}/Hospitals/GetDto/${hospitalId}`).toPromise();
  }

  async getDeptById(deptId : number) {
    return this.http.get(`${this.apiUrl}/Departments/${deptId}`).toPromise();
  }

  async getDiseaseById(diseaseId : number) {
    return this.http.get(`${this.apiUrl}/Diseases/${diseaseId}`).toPromise();
  }

  async getDegreeById(degreeId : number) {
    return this.http.get(`${this.apiUrl}/Degrees/${degreeId}`).toPromise();
  }

  async getDoctorById(doctorId : number) {
    return this.http.get(`${this.apiUrl}/Doctors/${doctorId}`).toPromise();
  }

  async getCitiesByCountry(countryId : number) {
    return this.http.get(`${this.apiUrl}/Cities?countryId=${countryId}`).toPromise();
  }

  async getDistrictsByCity(cityId : number) {
    return this.http.get(`${this.apiUrl}/Districts?cityId=${cityId}`).toPromise();
  }
}
