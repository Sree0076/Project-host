export interface User {
  id: number;
  name: string;
  createdBy: string;
  permissions: string[];
  status: 'active' | 'inactive';
  isEditing: boolean;
}
