import { Component } from '@angular/core';
import { SideBarComponent } from "../../components/side-bar/side-bar.component";
import { EditIncidentFormComponent } from "../../components/edit-incident-form/edit-incident-form.component";

@Component({
  selector: 'app-incidenteditpage',
  standalone: true,
  imports: [SideBarComponent, EditIncidentFormComponent],
  templateUrl: './incidenteditpage.component.html',
  styleUrl: './incidenteditpage.component.scss'
})
export class IncidenteditpageComponent {

}
