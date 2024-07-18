import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [BadgeModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

}
