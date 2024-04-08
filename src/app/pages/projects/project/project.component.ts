import { ProjectService } from "./../../../@core/mock/project.service";
import { Component } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";

import {NbDialogRef, NbDialogService } from "@nebular/theme";
import { AddProjectComponent } from "../add-project/add-project.component";
import { Apollo } from "apollo-angular";
import { _DisposeViewRepeaterStrategy } from "@angular/cdk/collections";

import { UploadFileComponent } from "../upload-file/upload-file.component";


@Component({
  selector: "ngx-project",
  templateUrl: "./project.component.html",
  template: `
    <div *ngFor="let project of projects">
      {{ project.project_name }} - {{ project.subject }}
    </div>
  `,
  styleUrls: ["./project.component.scss"],
})
export class ProjectComponent {
  settings = {
    actions: {
      add: false,
      edit: true,
      delete: true,
    },

    
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave:true
    },
    add: {
      editButtonContent: '<i class="nb-plus"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave:true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    row:{
    rowClassFunction: (row) => {
      if (!row.projects || !row.projects.file) {
        return 'red-row'; // Apply the 'red-row' class when 'file' is empty or projects are missing
      }
      return '';
    }},
    columns: {
  
      projectName: {
        title: "project_name",
        type: "string",
      },
      subject: {
        title: "subject",
        type: "string",
      },
      description: {
        title: "description",
        type: "string",
      },
      leader_name: {
        title: "leader_name",
        type: "string",
      },
      start_date: {
        title: "start_date",
        type: 'html',
        valuePrepareFunction: (value) => {
          return new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
      }},
      end_date: {
        title: "end_date",
        type: 'html',
        valuePrepareFunction: (value) => {
          return new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
        },
      },
    
      file: {
        title: "file",
        saveButtonContent: '<i class="nb-checkmark"></i>',
        type: 'custom',
        renderComponent: UploadFileComponent,
        onComponentInitFunction: (instance) => {
            // console.log(instance, 'filedata');
    
            if (instance.rowData ) {

                // console.log("helloooooooo");
                instance.fileData = instance.row.file; // Pass file data to the custom component
                // console.log(instance.fileData, 'iiiiiiiiiiiiii');
                return instance.fileData
              
        
            } else {
                // console.log("File data is missing or invalid");
            }
        }
    }
    }
    }
       
      
  source: LocalDataSource = new LocalDataSource();
  projects: any[] = [];
  user: any[] = [];

  constructor(
    private dialogService: NbDialogService,
    private projectService: ProjectService,
    private apollo: Apollo
  ) {}

  // delete un row in the table 
  onDeleteConfirm(event): void {
    console.log(event, "evennnnnnt");
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
      this.removeProject(event);
    } else {
      event.confirm.reject();
    }
  }
  onSaveConfirm(event){



  }
  removeProject(event) {
    console.log(event.data._id, "dataaaaaaaaaaaa");
    this.apollo
      .mutate<any>({
        mutation: this.projectService.removeProject(event.data._id),
      })
      .subscribe(({ data }) => {
        console.log("removed data", data);
        
      });
    
  }
// pour faire update d'un projet
onEditConfirm(event) {
    console.log(event, "eventtttt");
    this.edit(event);
  }
  edit( event) {
    console.log( event, "here event");
    this.apollo
      .mutate<any>({
        mutation: this.projectService.edit(event.newData),
      })
      .subscribe(({data}) => {
        console.log("Updated data", data);
        if (data) {
          event.confirm.resolve(event.newdata);
          
        }
      });
  }
  async getProjects() {
  try {
    const { data } = await this.apollo.query<any>({
      query: this.projectService.getProjects(),
    }).toPromise();

    if (data && data.getProjects) {
      this.projects = data.getProjects;
      this.source.load(this.projects); // Load projects data into ng2-smart-table
    } else {
      console.error('No projects data found or getProjects is null.');
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
}
    async getUsers(){
      await this.apollo
      .query<any>({
      query: this.projectService. getUserByProject(),
  
  
    
      })
      .subscribe(({ data }) => {
        console.log("all data", data);
        this.user = data.getUserssss;
        console.log('leader_name',this.user)
    
      
      });
  
    }
    // the row will be red when no file 
    onrowSelect(event: any) {
      // Check if file is uploaded for the selected row
      if (event.data.file) {
        event.isSelected = true; // Highlight selected row
        
      } else {
        event.isSelected = false; // Remove highlight for rows without files
        console.log('row without file:', event.data);
        event.element.classList.add('no-file-row'); // Add a CSS class to style the row as red
       
      }
    }
// ouvrir dialogue pour la création du projet
  addProjectDialog() {
    const dialogReference = this.dialogService.open(AddProjectComponent, {
      context: {
        title: "Ajouter un nouveau projet",
      },
    });
    dialogReference.onClose.subscribe(() => {
      this.getProjects(); // Rechargez les projets après la fermeture du dialogue
    });
  } 



  ngOnInit() {
 
    this.getProjects()
    this.getUsers();
    this.onrowSelect
  }}