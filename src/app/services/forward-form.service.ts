import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userDetails } from '../models/users_forward_form.interface';

@Injectable({
  providedIn: 'root'
})
export class ForwardFormService {

  constructor(private http: HttpClient) {}

  getAllUsers():Observable<userDetails[]>{
    return this.http.get<userDetails[]>('https://localhost:7209/Employee/GetEmployees');
  }

  forwardIncident(incidentId: number, assignedEmployeeIds: number[]): Observable<any> {
    const url = `https://localhost:7209/api/AssignedIncident/AssignIncidentToEmployees/${incidentId}`;
    return this.http.post(url, assignedEmployeeIds);
  }

}
