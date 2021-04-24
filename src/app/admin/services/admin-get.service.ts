import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminGetService {

  apiUrl = 'https://localhost:5001/api/';

  constructor(private http : HttpClient) { }

  async getAllHospitals() {
    return this.http.get(this.apiUrl + 'Hospitals').toPromise();
  }

  async getAllCountries() {
    return this.http.get(this.apiUrl + 'Countries').toPromise();
  }

  async getAllCities() {
    return this.http.get(this.apiUrl + 'Cities/All').toPromise();
  }

  async getAllDistricts() {
    return this.http.get(this.apiUrl + 'Districts/All').toPromise();
  }
}
