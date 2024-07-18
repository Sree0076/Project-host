import { DatePipe } from "@angular/common";

export interface IncidentData {
  id: number;
  incidentNo: string;
  incidentTitle: string;
  incidentDescription: string;
  reportedBy: string;
  roleOfReporter: string;
  incidentOccuredDate: Date; // Use Date if you handle dates in ISO format
  monthYear: string;
  incidentType: string;
  category: string;
  priority: string;
  actionAssignedTo: string;
  deptOfAssignee: string;
  investigationDetails: string;
  associatedImpacts: string;
  collectionOfEvidence: string;
  correction: string;
  correctiveAction: string;
  correctionCompletionTargetDate: string; // Use Date if you handle dates in ISO format
  correctionActualCompletionDate: string; // Use Date if you handle dates in ISO format
  correctiveActualCompletionDate: string; // Use Date if you handle dates in ISO format
  incidentStatus: string;
  correctionDetailsTimeTakenToCloseIncident: number;
  correctiveDetailsTimeTakenToCloseIncident: number;
  isDraft: boolean;
  employeeId: number;
  createdAt: string; // Use Date if you handle dates in ISO format
}

export interface IncidentStatsDTO {
  privacyTotalIncidents: number;
  privacyPendingIncidents: number;
  privacyClosedIncidents: number;
  securityTotalIncidents: number;
  securityPendingIncidents: number;
  securityClosedIncidents: number;
  qualityTotalIncidents: number;
  qualityPendingIncidents: number;
  qualityClosedIncidents: number;
  incidents: IncidentData[];
}
