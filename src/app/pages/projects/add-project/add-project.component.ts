import { ProjectService } from "./../../../@core/mock/project.service";

import { Component, ViewChild } from "@angular/core";

import {

  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { Apollo } from "apollo-angular";
import { NbDatepicker, NbDialogRef, NbDialogService } from "@nebular/theme";


import { UploadFormComponent } from "../upload-form/upload-form.component";

@Component({
  selector: "ngx-add-project",
  templateUrl: "./add-project.component.html",
  styleUrls: ["./add-project.component.scss"],
})
export class AddProjectComponent {
  @ViewChild('endPicker') endPicker: NbDatepicker<any>;
  newProjectForm = new FormGroup({
    projectName: new FormControl("", Validators.required),
    subject: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    userId: new FormControl("", Validators.required),
    leader_name: new FormControl("", Validators.required),
    start_date: new FormControl("", Validators.required),
    end_date: new FormControl("", Validators.required),
    file:new FormControl("", Validators.required)
  });
  file: File = null;
  title: any;
  projects: any = [];
  user: any = [];
  projectCreated = false; // Flag to track project creation status
  urlFile: string | ArrayBuffer;
  constructor(
   
    private projectService: ProjectService,
    private apollo: Apollo,
    private dialogService: NbDialogService,

    private dialogRef: NbDialogRef<AddProjectComponent>
  ) {}
  ngOnInit() {
    this.getUsers();
    console.log("ppppppppppppppp");
  }
  createForm() {
    console.log(this.newProjectForm.value);
  }
  openEndDatePicker() {
    this.endPicker;
  }
  async getUsers() {
   return await this.apollo
      .query<any>({
        query: this.projectService.getAllUsers(),
      })
      .subscribe(({ data }) => {
        console.log("all data", data);
        this.user = data.getUserss;
        console.log("ssssssssss", this.user);
      });
  }

  createProject() {
    this.apollo
      .mutate<any>({
        mutation: this.projectService.createProject(this.newProjectForm.value,this.urlFile),
        // call mutate function
      })
      .subscribe(() => {

       
        this.projectCreated = true; // Set flag to true on successful creation
     

          this.dialogRef.close();
          // // this.router.navigate(["./pages/project/project-table"])
          // this.source.load(this.projects);
        })};
      

  onFilechange(pdf: any) {
    const file = pdf.target.files && pdf.target.files[0];
  
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = (event) => {
        this.urlFile = (<FileReader>event.target).result;
        alert("File uploaded successfully");
        // Perform any additional actions related to file upload
      };
    } else {
      // Handle project creation without a file
      this.createProjectWithoutFile();
    }
  }
  
  createProjectWithoutFile() {
    // Logic to create a project without a file
    alert("Project created without a file");
    // Perform project creation steps here
  }
  uploadDocuments(){
    this.dialogService.open(UploadFormComponent, {
      context: {
        // You can pass data to the form component if needed
      },
    })
  }
  }
