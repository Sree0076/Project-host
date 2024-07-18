import { Component } from '@angular/core';
import { DatePipe, NgFor } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IncidentReportFormApiService } from '../../services/incident-report-form-api.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IncidentData } from '../../models/incidentData.interface';
import { Router } from '@angular/router';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-edit-incident-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatOptionModule,
    NgFor,
  ],
  templateUrl: './edit-incident-form.component.html',
  styleUrl: './edit-incident-form.component.scss',
  providers: [DatePipe],
})
export class EditIncidentFormComponent {
  constructor(
    private apiService: IncidentReportFormApiService,
    private datePipe: DatePipe,
    private router: Router
  ) {}
  data: any = {};
  id: number = 0;
  editform!: FormGroup;
  editIncidentId: number = 0;
  incident!: IncidentData;
  editAction: Boolean = false;

  incidentTypes = [
    { label: 'Security Incident', value: 'SecurityIncident' },
    { label: 'Privacy Incident', value: 'PrivacyIncident' },
    { label: 'Quality Incident', value: 'QualityIncident' },
  ];

  categories = [
    { label: 'Denial of Service', value: 'denialOfService' },
    { label: 'Loss', value: 'loss' },
    { label: 'Theft', value: 'theft' },
    { label: 'Malware', value: 'malware' },
    { label: 'Ransomware', value: 'ransomware' },
    { label: 'Unauthorized Use', value: 'unauthorizedUse' },
    { label: 'Disclosure', value: 'disclosure' },
    { label: 'Unauthorized Access', value: 'unauthorizedAccess' },
    { label: 'Phishing', value: 'phishing' },
    { label: 'Unplanned Downtime', value: 'unplannedDowntime' },
    { label: 'Insecure Site', value: 'insecureSite' },
    { label: 'Insecure Coding', value: 'insecureCoding' },
    { label: 'Physical Security', value: 'physicalSecurity' },
    { label: 'Spoofing', value: 'spoofing' },
    { label: 'Botnet Attack', value: 'botnetAttack' },
    { label: 'Exposed APIs', value: 'exposedAPIs' },
    { label: 'Disclosing IP Data', value: 'disclosingIPData' },
  ];

  priorities = [
    { label: 'High', value: 'High-L1' },
    { label: 'Medium', value: 'Medium-L2' },
    { label: 'Low', value: 'Low-L3' },
  ];

  

  ngOnInit() {
    console.log(this.id);

    this.apiService.getIncident(this.id).subscribe((response) => {
      console.log(response);
      this.data = response;
    });
    console.log(this.data.monthYear);
  }

  extractDateTime(): { date: string; time: string } {
    const parsedDate = new Date(this.data.monthYear);
    const date = this.datePipe.transform(parsedDate, 'yyyy-MM-dd')!;
    const time = this.datePipe.transform(parsedDate, 'HH:mm:ss')!;
    return { date, time };
  }

  onSubmit() {
    console.log(this.editform.value);
    this.editform.value.isDraft = false;
    console.log(this.editform.value.isDraft);
    if (this.editAction) {
      this.apiService
        .updateIncident(this.editIncidentId, this.editform.value)
        .subscribe((response) => {
          console.log('Incident updated successfully', response);
          this.router.navigate(['/user']);
        });
    } else {
      this.apiService.addIncident(this.editform.value).subscribe((response) => {
        console.log('Incident added successfully', response);
        this.router.navigate(['/user']);
      });
    }
  }

  redirectToView(): void {
    this.router.navigate(['/view-incident', this.data.incidentNo]);
  }
}
