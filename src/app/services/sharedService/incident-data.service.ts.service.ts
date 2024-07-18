import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IncidentStatsDTO } from '../../models/incidentData.interface';
import { CardApiService } from '../card-api.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentDataServiceTsService {

  private incidentDataSubject: BehaviorSubject<IncidentStatsDTO | null> = new BehaviorSubject<IncidentStatsDTO | null>(null);
  public incidentData: Observable<IncidentStatsDTO | null> = this.incidentDataSubject.asObservable();

  constructor(private cardApiService: CardApiService) {}

  fetchIncidentData(): void {
    this.cardApiService.getDataBasedOnStatus().subscribe((data: IncidentStatsDTO) => {
      this.incidentDataSubject.next(data);
    });
  }
}
