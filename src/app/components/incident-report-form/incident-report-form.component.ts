import { Incident } from './../../models/incident.interface';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IncidentReportFormApiService } from '../../services/incident-report-form-api.service';
import { DatePipe, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentServiceTsService } from '../../services/sharedService/incident-service.ts.service';
import { IncidentData } from '../../models/incidentData.interface';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-incident-report-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FileUploadModule,
    InputTextareaModule,
    ToastModule, ButtonModule, RippleModule
  ],
  providers: [DatePipe,MessageService],
  templateUrl: './incident-report-form.component.html',
  styleUrl: './incident-report-form.component.scss',
})
export class IncidentReportFormComponent {
  incident!: IncidentData;

  incidentTypes = [
    { label: 'Security Incident', value: 'Security Incidents' },
    { label: 'Privacy Incident', value: 'Privacy Incidents' },
    { label: 'Quality Incident', value: 'Quality Incidents' },
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
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' },
  ];

  constructor(
    private router: Router,
    private apiService: IncidentReportFormApiService,
    private incidentService: IncidentServiceTsService,
    private messageService: MessageService
  ) {}

  showSuccess(message:string) {
    setTimeout(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `${message}` });
      setTimeout(() => {
        this.router.navigate(['/user']); // Navigate to '/user' route after success message displayed
      }, 2000); // Adjust delay as needed for the success message to display
    }, 100);
}

  saveAsDraft() {
    this.viewform.value.isDraft = true;
    console.log(this.viewform.value);

      this.apiService.addIncident(this.viewform.value).subscribe((response) => {
        console.log('Incident added successfully', response);
        this.showSuccess("Incident saved as draft successfully");

      });

  }
  viewform!: FormGroup;

  ngOnInit() {

    this.viewform = new FormGroup({
      incidentTitle: new FormControl('', Validators.required),
      category: new FormControl(''),
      incidentType: new FormControl(''),
      incidentAttachment: new FormControl(''),
      incidentOccuredDate: new FormControl('', Validators.required),
      incidentOccuredTime: new FormControl('', Validators.required),
      incidentDescription: new FormControl('', Validators.required),
      reportedBy: new FormControl('', Validators.required),
      reportedDate: new FormControl('', Validators.required),
      priority: new FormControl(''),
      isDraft: new FormControl(false),
    });
  }

  onSubmit() {
    console.log(this.viewform.value);
    this.viewform.value.isDraft = false;
      this.apiService.addIncident(this.viewform.value).subscribe( (response) => {
        console.log('Incident added successfully', response);
         this.showSuccess("Incident added successfully");

      });

  }

  public onUploadSuccess(event: any): void {
    console.log('File uploaded successfully:', event);
  }

  public onUploadError(event: any): void {
    console.log('Error uploading file:', event);
  }
}
