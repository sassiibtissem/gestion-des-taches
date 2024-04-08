import { ProjectService } from "./../../../@core/mock/project.service";
import { Apollo } from "apollo-angular";
import { TaskService } from "./../../../@core/mock/task.service";
import { Component, ViewChild } from "@angular/core";
import {

  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NbDatepicker, NbDialogRef } from "@nebular/theme";

@Component({
  selector: "ngx-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.scss"],
})
export class AddTaskComponent {
  @ViewChild('endPicker') endPicker: NbDatepicker<any,any> ;
    newTaskForm = new FormGroup({
    projectId: new FormControl("", Validators.required),
    // projectName: new FormControl("", Validators.required),
    task_name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    developerId: new FormControl("", Validators.required),
    // developer_name:new FormControl("", Validators.required),
    start_date: new FormControl("", Validators.required),
    estimation_time: new FormControl("", Validators.required),
    state: new FormControl("", Validators.required),
  });
  urlFile: string | ArrayBuffer;
  user: any = [];
  projects: any = [];
  constructor(
    private taskService: TaskService,
    private apollo: Apollo,
    private projectService: ProjectService,

    private dialogRef: NbDialogRef<AddTaskComponent>
  ) {}

  ngOnInit() {
    console.log("developerss");
    this.getUsers();
    
    this.getProjects();
    console.log("projects");
  }
  openEndDatePicker() {
    this.endPicker;
  }
  createForm() {
    console.log(this.newTaskForm.value);
  }
  async getUsers() {
    await this.apollo
      .query<any>({
        query: this.taskService.getAllUsers(),
      })
      .subscribe(({ data }) => {
        console.log("all data", data);
        this.user = data.getDevelopers;
        console.log("ssssssssss", this.user);
      });
  }

  getProjects() {
    this.apollo
      .query<any>({
        query: this.projectService.getProjects(),
      })
      .subscribe(({ data }) => {
        console.log("project", data);
        this.projects = data.getProjects;
      });
    

  }

  createTask() {
    console.log("taskkkkk");
    this.apollo
      .mutate<any>({
        mutation: this.taskService.createTask(this.newTaskForm.value),
        // call mutate function
      })
      .subscribe(({ data }) => {
        if (data) {
          console.log(data);

          this.dialogRef.close();

          //
          // // this.router.navigate(["./pages/Task/task-table"])
          // this.source.load(this.Tasks);
        }
      });
  }
  getUserByProject() {
    this.apollo
      .query<any>({
        query: this.projectService.getUserByProject(),
      })
      .subscribe(({ data }) => {
        console.log("all data", data);
        this.projects = data.getUserByProject;
      });
  }
  onFilechange(pdf: any) {
    const file = pdf.target.files && pdf.target.files[0];
    console.log(file, "file");
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        console.log(event, "event File");
        // this.File = reader.result;
        this.urlFile = (<FileReader>event.target).result;
        console.log("🍰[ this.urlFile ]:", this.urlFile);
      };

      
       

  }

  }



}
