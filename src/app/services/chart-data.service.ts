import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartDataService {
  constructor(private http: HttpClient) {}
  private json =
    'https://api.jsonsilo.com/public/da8e7333-5488-46ff-a295-a7dfd499d9fa';

  getChartData(): Observable<any> {
    return this.http
      .get<any[]>(this.json)
      .pipe(map((data) => this.processData(data)));
  }

  private processData(data: any[]): any {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);
    const incidentTypes = ['Privacy', 'Security', 'Quality'];
    const counts: { [key: string]: number[] } = {};

    incidentTypes.forEach((type) => {
      counts[type] = years.map(() => 0);
    });

    data.forEach((incident) => {
      const incidentYear = new Date(incident.reported_at).getFullYear();
      const yearIndex = years.indexOf(incidentYear);
      if (yearIndex !== -1) {
        const type = incident.incident_type;
        if (counts[type]) {
          counts[type][yearIndex]++;
        }
      }
    });

    return {
      labels: years,
      datasets: incidentTypes.map((type) => ({
        label: type,
        data: counts[type],
      })),
    };
  }
}

