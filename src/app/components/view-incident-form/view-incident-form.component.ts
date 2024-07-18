import { Component } from '@angular/core';
import { IncidentReportFormApiService } from '../../services/incident-report-form-api.service';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { Router } from '@angular/router';
import { IncidentServiceTsService } from '../../services/sharedService/incident-service.ts.service';


@Component({
  selector: 'app-view-incident-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './view-incident-form.component.html',
  styleUrl: './view-incident-form.component.scss',
})
export class ViewIncidentFormComponent {
  constructor(
    private apiService: IncidentReportFormApiService,
    private router: Router,
    private incidentService: IncidentServiceTsService,
    private datePipe: DatePipe

  ) {}
  data: any = {};
  id: number = 0;

  ngOnInit() {

    this.incidentService.selectedIncidentId$.subscribe((incidentId) => {
      this.id = incidentId;
      this.fetchIncident();
      console.log('Selected incident ID:', this.id);
    });
    console.log(this.data.monthYear);
  }
  fetchIncident() {
    this.apiService.getIncident(this.id).subscribe((response) => {
      console.log(response);
      this.data = response;
    });
  }

  extractDateTime(): { date: string; time: string } {
    const parsedDate = new Date(this.data.monthYear);
    const date = this.datePipe.transform(parsedDate, 'yyyy-MM-dd')!;
    const time = this.datePipe.transform(parsedDate, 'HH:mm:ss')!;
    return { date, time };
  }

  redirectToEditPage(): void {
    this.router.navigate(['/edit-form', this.data.incidentNo]);
  }
}
