
import { Component, Input, SimpleChanges, Type, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ForwardFormComponent } from "../forward-form/forward-form.component";
import { IncidentData } from '../../models/incidentData.interface';
import { IncidentServiceTsService } from '../../services/sharedService/incident-service.ts.service';
import { IncidentDataServiceTsService } from '../../services/sharedService/incident-data.service.ts.service';
import { CardApiService } from '../../services/card-api.service';
import { TagModule } from 'primeng/tag';

interface PriorityOrder {
  High: number;
  Medium: number;
  Low: number;
}
@Component({
    selector: 'app-table',
    standalone: true,
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
    imports: [RouterOutlet, ButtonModule, TableModule, CommonModule, SplitButtonModule, InputIconModule, IconFieldModule,
        InputTextModule, DropdownModule, DropdownModule, FormsModule, DialogModule, MenuModule, OverlayPanelModule, ForwardFormComponent,TagModule]
})
export class TableComponent {
  @Input() isadmin:boolean=false;
  @Input() getDraft:boolean=false;
  @Input() filterCategory: string = '';

  @ViewChild('dt2') dt2: Table | undefined;
  incidents:IncidentData[]=[];
  loading: boolean = false;
  priorities: any[] = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' }
  ];
  statuses: any[] = [
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'progress' },
    { label: 'In Review', value: 'review' },
    { label: 'Closed', value: 'closed' }
  ];

  searchValue: string | undefined;
  displayForwardingModal: boolean = false;
  selectedIncidentId: number | null = null;
  menuitems: MenuItem[] | undefined;

  first = 0;
  rows = 10;

  priorityValue: any;
  incidentTypeValue :any;
  selectedIncidents: IncidentData[]=[];


  constructor(private router:Router,private tablefetchService: CardApiService,private incidentDataService: IncidentDataServiceTsService,private incidentService: IncidentServiceTsService) {}

  ngOnInit() {
    if (!this.getDraft) {
      this.incidentDataService.incidentData.subscribe(data => {
        if (data) {
          this.incidents = data.incidents;
          this.sortByPriority();
          console.log(data);
        }
      });
    } else {
      this.tablefetchService.getDraftIncidents().subscribe(data => {
        if (Array.isArray(data)) {
          this.incidents = data;
          this.sortByPriority();
          console.log(data);
        } else {
          console.error("Unexpected data format for draft incidents:", data);
        }
      });
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['filterCategory'] && !changes['filterCategory'].isFirstChange()) {
      this.applyCategoryFilter();
    }
  }
  next() {
      this.first = this.first + this.rows;
  }

  prev() {
      this.first = this.first - this.rows;
  }

  reset() {
      this.first = 0;
  }

  pageChange(event:any) {
      this.first = event.first;
      this.rows = event.rows;
  }

  isLastPage(): boolean {
      return this.incidents ? this.first === this.incidents.length - this.rows : true;
  }

  isFirstPage(): boolean {
      return this.incidents ? this.first === 0 : true;
  }
  clear(table: Table) {
    table.clear();
    this.searchValue = ''
}
filterGlobal(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const value = inputElement.value;
  console.log(value);
  if (this.dt2) {
    this.dt2.filterGlobal(value, 'contains');
  }
}
filterPriority(event: any) {
  const value = event.value;
  if (this.dt2) {
    this.dt2.filter(value, 'priority', 'equals');
  }
}
filterStatus(event: any) {
  const value = event.value;
  if (this.dt2) {
    this.dt2.filter(value, 'incidentStatus', 'equals');
  }
}


openForwardingModal(incidentId: number) {
  this.selectedIncidentId = incidentId;
  this.incidentService.setSelectedIncidentId(incidentId);
  this.displayForwardingModal = true;
}
onDialogClosed() {
  this.displayForwardingModal = false;
}
onAddItem()
{
  this.router.navigate(['/create-incident']);
}

applyCategoryFilter() {
  console.log(this.filterCategory);
    if (this.dt2) {
      this.dt2.filter(this.filterCategory,'incidentType', 'contains');
    }
}

editIncidentData(incidentId: number): void
{
  console.log("edit");
  this.incidentService.setSelectedIncidentId(incidentId);
  this.router.navigate(['/edit-incident']);
}

viewIncidentData(incidentId: number): void
{
  console.log("view");
  this.incidentService.setSelectedIncidentId(incidentId);
  this.router.navigate(['/view-incident']);
}
sortByPriority() {
  const priorityOrder: PriorityOrder = { High: 1, Medium: 2, Low: 3 };

  this.incidents.sort((a, b) => {
    return priorityOrder[a.priority as keyof PriorityOrder] - priorityOrder[b.priority as keyof PriorityOrder];
  });
}

getSeverity(status: string) {
  switch (status) {
      case 'closed':
          return 'success';
      case 'progress':
          return 'info';
      case 'pending':
          return 'danger';
      case 'review':
            return 'secondary';
      default: return 'warning';
  }
}
}
