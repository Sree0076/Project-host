import { Component } from '@angular/core';
import { SideBarComponent } from "../../components/side-bar/side-bar.component";
import { ViewIncidentFormComponent } from "../../components/view-incident-form/view-incident-form.component";

@Component({
  selector: 'app-incident-vew-page',
  standalone: true,
  imports: [SideBarComponent, ViewIncidentFormComponent],
  templateUrl: './incident-vew-page.component.html',
  styleUrl: './incident-vew-page.component.scss'
})
export class IncidentVewPageComponent {

}
