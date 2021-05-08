import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorDeleteService {
  apiUrl = "https://localhost:5001/api";

  constructor(private http : HttpClient) { }

  deleteAdvice(adviceId : number) {
    return this.http.delete(`${this.apiUrl}/Advices/${adviceId}`);
  }

  deleteQuestion(questionId : number) {
    return this.http.delete(`${this.apiUrl}/Questions/${questionId}`);
  }
}
