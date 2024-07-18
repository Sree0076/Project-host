import { NgIf, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { IncidentData } from '../../models/incidentData.interface';
import { IncidentReportFormApiService } from '../../services/incident-report-form-api.service';
import { IncidentServiceTsService } from '../../services/sharedService/incident-service.ts.service';
import { CardApiService } from '../../services/card-api.service';

@Component({
  selector: 'app-user-edit-form',
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
  ],
  providers: [DatePipe],
  templateUrl: './user-edit-form.component.html',
  styleUrl: './user-edit-form.component.scss'
})
export class UserEditFormComponent {
  editIncidentId: number = 0;
  incident!: IncidentData;
  editAction: Boolean = false;

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
    private apiService: CardApiService,
    private incidentService: IncidentServiceTsService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  saveAsDraft() {
    this.viewform.value.isDraft = true;
    console.log(this.viewform.value);

      this.apiService
        .updateUserIncident(this.editIncidentId, this.viewform.value)
        .subscribe((response) => {
          console.log('Incident updated successfully', response);
          this.router.navigate(['/user']);
        });

  }
  viewform!: FormGroup;

  ngOnInit() {
    console.log(this.editAction);
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
      employeeId: new FormControl(0),
    });
    // this.route.params.subscribe((params) => {
    //   if (params['action'] === 'edit') {
    //     console.log('edit1');
    //     this.editAction = true;
        this.incidentService.selectedIncidentId$.subscribe((incidentId) => {
          this.editIncidentId = incidentId;
          this.fetchIncident();
          console.log('Selected incident ID:', this.editIncidentId);
        });
    //   }
    // });
  }

  onSubmit() {
    console.log(this.viewform.value);
    this.viewform.value.isDraft = false;
    console.log(this.viewform.value.isDraft);
     this.viewform.value.employeeId=2;
      this.apiService.updateUserIncident(this.editIncidentId, this.viewform.value).subscribe((response) => {
          console.log('Incident updated successfully', response);
          this.router.navigate(['/user']);
        });
  }
  fetchIncident() {
    this.apiService.getSingleIncident(this.editIncidentId).subscribe((response) => {
      console.log('Incident Fetched successfully', response);

      if (response.incidentOccuredDate) {
        const incidentDate = new Date(response.incidentOccuredDate);
        response.incidentOccuredDate = incidentDate
      }

      this.incident = response;
    });
  }


  public onUploadSuccess(event: any): void {
    console.log('File uploaded successfully:', event);
  }

  public onUploadError(event: any): void {
    console.log('Error uploading file:', event);
  }
}
