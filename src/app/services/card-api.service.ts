import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IncidentData, IncidentStatsDTO } from '../models/incidentData.interface';
import { Incident } from '../models/incident.interface';

@Injectable({
  providedIn: 'root',
})
export class CardApiService
{
  private jsonUrl = 'assets/data.json';
  private fetchCardUrl ='https://localhost:7209/Incident/GetIncidentsByEmployeeId?employeeId=2';

  constructor(private http: HttpClient) {}

  getDataBasedOnStatus(): Observable<IncidentStatsDTO>
   {
    return this.http.get<IncidentStatsDTO>(`${this.fetchCardUrl}`);
   }

  public getDraftIncidents(): Observable<IncidentData> {
    return this.http.get<IncidentData>("https://localhost:7209/Incident/GetDraftIncidentsByEmployeeId?employeeId=2");
  }

  public getSingleIncident(incidentId:number): Observable<IncidentData> {
    return this.http.get<IncidentData>(`https://localhost:7209/Incident/GetUserUpdateIncident/${incidentId}`);
  }

  public updateUserIncident(incidentId: number, incident: any): Observable<IncidentData> {
    return this.http.put<any>(`https://localhost:7209/Incident/UserUpdateIncident/${incidentId}`,incident);
  }



}
