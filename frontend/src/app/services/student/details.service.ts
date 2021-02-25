import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  constructor(private http: HttpClient) {}

  getStudentDetails() {
    return this.http.get('http://192.168.1.14:4000/api/student').toPromise();
  }

  postStudentDetails(data: any) {
    return this.http
      .post('http://192.168.1.14:4000/api/student/create', data)
      .toPromise();
  }

  putStudentDetails(data: any) {
    return this.http
      .put('http://192.168.1.14:4000/api/student/create', data)
      .toPromise();
  }
}
