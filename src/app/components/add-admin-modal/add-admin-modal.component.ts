  import { Component } from '@angular/core';
  import { FilterPipe } from '../../pipes/filter.pipe';
  import { ForwardFormService } from '../../services/forward-form.service';
  import { userDetails } from '../../models/users_forward_form.interface';
  import { FormsModule } from '@angular/forms';

  @Component({
    selector: 'app-add-admin-modal',
    standalone: true,
    imports: [FilterPipe,FormsModule],
    templateUrl: './add-admin-modal.component.html',
    styleUrl: './add-admin-modal.component.scss'
  })
  export class AddAdminModalComponent {
    user_details:userDetails[]=[];
    searchTerm:string='';
    constructor(public forwardFormService : ForwardFormService){}
    selectedUser: userDetails |undefined;
    checkboxes: { [key: string]: boolean } = {
      'incidentManagement': false,
      'adminManagement': false
    };

    ngOnInit():void{
      this.forwardFormService.getAllUsers().subscribe(data => 
      {
        this.user_details = data;
        console.log(data);

      }
      )
    }
    addUser(user:userDetails){
      this.selectedUser=user;
    }
    removeUser(){
      this.selectedUser=undefined;
    }
    add(){
      console.log(this.selectedUser);
      console.log("incidentManagement:",this.checkboxes['incidentManagement']);
      console.log("adminManagement:",this.checkboxes['adminManagement']);
      this.resetForm();
    }

    toggleCheckbox(key: string) {
      this.checkboxes[key] = !this.checkboxes[key];
    }

    isAddButtonDisabled(): boolean {
      return !(this.selectedUser && (this.checkboxes['incidentManagement'] || this.checkboxes['adminManagement']));
    }
    resetForm() {
      this.searchTerm = '';
      this.selectedUser = undefined;
      this.checkboxes = {
        'incidentManagement': false,
        'adminManagement': false
      };
    }
  
  }
