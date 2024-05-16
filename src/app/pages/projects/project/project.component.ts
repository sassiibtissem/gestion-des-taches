import { ProjectService } from "./../../../@core/mock/project.service";
import { Component, Input } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";

import {NbDialogRef, NbDialogService } from "@nebular/theme";
import { AddProjectComponent } from "../add-project/add-project.component";
import { Apollo } from "apollo-angular";
import { _DisposeViewRepeaterStrategy } from "@angular/cdk/collections";
import { UploadFileComponent } from "../upload-file/upload-file.component";
import { ListFilesComponent } from "../list-files/list-files.component";
import { PassingDataService } from "../../../@core/mock/passing-data.service";
import { Router } from "@angular/router";




@Component({
  selector: "ngx-project",
  template: `
    <app-ngx-list-files [_idProjectSelected ]="_idProjectSelected"></app-ngx-list-files>
 `,
  templateUrl: "./project.component.html",
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
        title: 'file',
        type: 'custom',
        renderComponent: UploadFileComponent,ListFilesComponent,
      
      //   onComponentInitFunction(instance: any) {
      //     const projectId = 'your_project_id'; // Replace with the actual project ID
      //     this.projectService.getAllFilesByProject(projectId).subscribe((result) => {
      //       this.projectFile = result?.data?.getAllFilesByProject?.map((file) => file.fileName) || [];
      //       console.log(this.projectFile, 'projectFile updated in parent');
      //       instance.fileNames = this.projectFile;
      //       // Ensure you pass the updated projectFile to the child component
      //       instance.load(this.projectFile);
      //       console.log(instance.fileNames          );
      //   }
      // )}
    }}
    }
  source: LocalDataSource = new LocalDataSource();
  projects: any[] = [];
 
  user: any[] = [];
   data:any=[];
   _idProjectSelected: any = '';

  constructor(
    private dialogService: NbDialogService,
    private projectService: ProjectService,
    private apollo: Apollo , 
    private passingdata : PassingDataService,
    private router:Router
  ) {}

  // delete un row in the table 
  onDeleteConfirm(event) {
    console.log( event, "event");
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
      this.removeProject(event);
    } else {
    event.confirm.reject();
    }
  }
  onSaveConfirm(event){

  }

  
  // Remove project in component
 async removeProject(event) {
  console.log(event.data._id, "data");

  try {
    // Check if the project has related users or tasks
    const hasRelatedItems = await this.projectService.checkRelatedItems(event.data._id);

    // If there are related items, show an alert and a confirmation dialog
    if (hasRelatedItems) {
      // alert("This project has related users or tasks.");
      const confirmDelete = confirm("This project has related users and tasks.Before You must delete the tasks related .");
      if (confirmDelete) {
        // Proceed with deletion
        // const removedProjectResult = await this.projectService.removeProject(event.data._id);
        // console.log("removed project", removedProjectResult);
        this.router.navigate(['./pages/task/task-table'], { queryParams: { projectId: event.data._id } });
    
      
    } else {
      // No related items, proceed with deletion directly
      const removedProjectResult = await this.projectService.removeProject(event.data._id);
      console.log("removed project", removedProjectResult);
    }}
  } catch (error) {
    console.error("Error removing project:", error);
  }

  // removeProject(event) {
  //   console.log(event.data._id, "data");
  //   this.apollo
  //     .mutate<any>({
  //       mutation: this.projectService.removeProject(event.data._id),
  //     })
  //     .subscribe(({ data }) => {
  //       console.log("removed data", data);
        
  //     });
    
  // }
}
// pour faire update d'un projet
onEditConfirm(event) {
    console.log(event, "event");
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
  await this.apollo.query<any>({
    query:this.projectService.getProjects()
  }).subscribe(({data})=>{
    
    this.projects=data.getProjects;
    console.log('all projects',this.projects)
    
    this.source.load(this.projects);
  })
}
  
  
    async getUsers(){
      await this.apollo
      .query<any>({
      query: this.projectService. getUserByProject()}).subscribe(({ data }) => {
        console.log("all data", data);
        this.user = data.getUserss;
        console.log('leader_name',this.user)
    
      
      });
  
    }
    
    
    // the row will be red when no file 
    rowSelected(event) {
      console.log('rowSelected', event);
      this._idProjectSelected = event._id; // Assuming projectId is the ID you want to pass
    }
// ouvrir dialogue pour la création du projet
  addProjectDialog() {
    const dialogReference = this.dialogService.open(AddProjectComponent, {
      context: {
        title: "Ajouter un nouveau projet",
      },
    });
    dialogReference.onClose.subscribe(() => {
      this.getProjects();
       // Rechargez les tasks après la fermeture du dialogue
    });
  } 



  ngOnInit() {
    console.log(this.projectService,'service Project');
 
    this.getProjects()
    this.getUsers();
 
   
  
  }



  getUserRowSelected(rowSelected){
    console.log("before",this._idProjectSelected);
    this._idProjectSelected = rowSelected.data._id;
    
    console.log("after",this._idProjectSelected);

    console.log(this._idProjectSelected,'selectedRowId in parent component:');
    this.passingdata.changeMessage(this._idProjectSelected);
    console.log('rowSelecteddddddd',rowSelected)
    
    this._idProjectSelected='';

    
  }
  
}

