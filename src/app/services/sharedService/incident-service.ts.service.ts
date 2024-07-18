import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidentServiceTsService {

  private selectedIncidentIdSource = new BehaviorSubject<number>(0);
  selectedIncidentId$ = this.selectedIncidentIdSource.asObservable();

  constructor() {}

  setSelectedIncidentId(incidentId: number): void {
    this.selectedIncidentIdSource.next(incidentId);
  }

}
