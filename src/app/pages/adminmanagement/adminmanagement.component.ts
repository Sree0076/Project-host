import { Component } from '@angular/core';
import { UserManagementComponent } from "../../components/user-management/user-management.component";
import { SideBarComponent } from "../../components/side-bar/side-bar.component";

@Component({
  selector: 'app-adminmanagement',
  standalone: true,
  imports: [UserManagementComponent, SideBarComponent],
  templateUrl: './adminmanagement.component.html',
  styleUrl: './adminmanagement.component.scss'
})
export class AdminmanagementComponent {

}
