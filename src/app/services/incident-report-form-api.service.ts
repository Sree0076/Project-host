import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IncidentData } from '../models/incidentData.interface';

@Injectable({
  providedIn: 'root',
})
export class IncidentReportFormApiService {
  constructor(private http: HttpClient) {}

  private createBaseUrl: string =
    'https://localhost:7209/Incident/CreateIncident';

  private fetchBaseUrl: string = 'https://localhost:7209/Incident/GetIncident/2';
  private updateBaseUrl: string = 'https://localhost:7209/Incident/PutIncident';

  addIncident(incident: any): Observable<any> {
    console.log(incident);

    return this.http.post(this.createBaseUrl, incident);
  }

  getIncident(id: number): Observable<any> {
    return this.http.get(`${this.fetchBaseUrl}`);
  }
  updateIncident(id: number, incident: any): Observable<any> {
    return this.http.put(`${this.updateBaseUrl}/${id}`, incident);
  }
}
