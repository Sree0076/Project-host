export interface Incident {
  id: number;
  title: string;
  total_incidents: number;
  pending_incidents: number;
  closed_incidents: number;
  svg: string;
  class: string;
}
