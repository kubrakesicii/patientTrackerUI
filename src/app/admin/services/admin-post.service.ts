import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../models/city.model';
import { Country } from '../models/country.model';
import { District } from '../models/district.model';

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
}
