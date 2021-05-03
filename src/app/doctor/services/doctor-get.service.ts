import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorGetService {

  apiUrl = "https://localhost:5001/api";

  constructor(private http : HttpClient) { }

  async getAllAdvices(deptId : any){
    return this.http.get(`${this.apiUrl}/Advices?deptId=${deptId}`).toPromise();
  }

  async getAllQuestions(deptId : any){
    return this.http.get(`${this.apiUrl}/Questions/All?deptId=${deptId}`).toPromise();
  }

  async getAllAppointments(doctorId:any){
    return this.http.get(`${this.apiUrl}/Appointments/Doctors?doctorId=${doctorId}`).toPromise();
  }

  async getAllPatients(doctorId : any){
    return this.http.get(`${this.apiUrl}/DoctorPatients/PatientsOfDoctor?doctorId=${doctorId}`).toPromise();
  }

  async getDoctorById(doctorId : number) {
    return this.http.get(`${this.apiUrl}/Doctors/PersonId?personId=${doctorId}`).toPromise();
  }
  

}
