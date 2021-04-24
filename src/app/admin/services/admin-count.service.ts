import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminCountService {

  apiUrl = 'https://localhost:5001/api';

  constructor(private http : HttpClient) { }
  
  async countCountries() {
    return this.http.get(this.apiUrl + 'Countries/Count').toPromise();
  }

  async countCities() {
    return this.http.get(`${this.apiUrl}/Cities/Count`).toPromise();
  }

  async countDistricts() {
    return this.http.get(`${this.apiUrl}/Districts/Count`).toPromise();
  }

  async countHospitals() {
    return this.http.get(`${this.apiUrl}/Hospitals/Count`).toPromise();
  }

  async countDept(hospitalId : any) {
    return this.http
      .get(`${this.apiUrl}/Departments/Count?hospitalId=${hospitalId}`)
      .toPromise();
  }

  async countDoctors(hospitalId : any) {
    return this.http
      .get(`${this.apiUrl}/Doctors/Count?hospitalId=${hospitalId}`)
      .toPromise();
  }

  async countDiseases(hospitalId : any) {
    return this.http
      .get(`${this.apiUrl}/Diseases/Count?hospitalId=${hospitalId}`)
      .toPromise();
  }
}
