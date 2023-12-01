import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JasperReportService {

  private backendUrl = 'http://localhost:8085/classkeeper';

  constructor(private http: HttpClient) { }

  generateReport(data: any[]) {
    return this.http.post(`${this.backendUrl}/jasper-report/generate`, data, { responseType: 'arraybuffer'});
  }

}
