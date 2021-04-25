import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorGetService {

  apiUrl = "https://localhost:5001/api";

  constructor(private http : HttpClient) { }

  getAllAdvices(deptId : any){
    return this.http.get(`${this.apiUrl}/Advices?deptId=${deptId}`);
  }

  getAllQuestions(deptId : any){
    return this.http.get(`${this.apiUrl}/Questions/All?deptId=${deptId}`);
  }

  getAllAppointments(doctorId:any){
    return this.http.get(`${this.apiUrl}/Appointments/Doctors?doctorId=${doctorId}`);
  }

  getAllPatients(doctorId : any){
    return this.http.get(`${this.apiUrl}/DoctorPatients/PatientsOfDoctor?doctorId=${doctorId}`);
  }

  

}
