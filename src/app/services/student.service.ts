import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  studentId: number;
  firstName: string;
  lastName: string;
  gender: string;
  className: string;
  phone: string;
  status: string;
  createdAt: string;
}

export interface CreateStudent {
  firstName: string;
  lastName: string;
  gender: string;
  className: string;
  phone: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:5080/api/Students';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  createStudent(student: CreateStudent): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
