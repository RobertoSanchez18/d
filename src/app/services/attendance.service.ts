import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attendance, AttendancePost } from '../interfaces/estudiante';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private apiUrl = "http://localhost:8085/classkeeper/v1/attendance"

  constructor(private http: HttpClient) { }

  saveAttendance(attendance: AttendancePost[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, attendance);
  }

  getAllAttendance(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/listAttendance`);
  }


}
