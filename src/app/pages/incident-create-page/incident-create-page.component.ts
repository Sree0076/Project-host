import { Component } from '@angular/core';
import { IncidentReportFormComponent } from "../../components/incident-report-form/incident-report-form.component";
import { SideBarComponent } from "../../components/side-bar/side-bar.component";

@Component({
  selector: 'app-incident-create-page',
  standalone: true,
  imports: [IncidentReportFormComponent, SideBarComponent],
  templateUrl: './incident-create-page.component.html',
  styleUrl: './incident-create-page.component.scss'
})
export class IncidentCreatePageComponent {

}
