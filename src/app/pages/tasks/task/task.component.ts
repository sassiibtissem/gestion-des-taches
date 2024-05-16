import { TaskService } from "./../../../@core/mock/task.service";
import { LocalDataSource } from "ng2-smart-table";
import { Component } from "@angular/core";
import { AddTaskComponent } from "../add-task/add-task.component";
import { NbDialogService } from "@nebular/theme";
import { Apollo } from "apollo-angular";
import { UploadFileComponent } from "../../projects/upload-file/upload-file.component";
import { PassingDataService } from "../../../@core/mock/passing-data.service";
import { ListFilesComponent } from "../../projects/list-files/list-files.component";
import { ProjectService } from "../../../@core/mock/project.service";

@Component({
  selector: "ngx-task",
  templateUrl: "./task.component.html",
  
  styleUrls: ["./task.component.scss"],
})
export class TaskComponent {
  settings = {
    actions: {
      add: false,
      edit: true,
      delete: true,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      task_name: {
        title: "Task Name",
        type: "string",
      },

      projectName: {
        title: "projectName",
        type: "string",
      },
      description: {
        title: "description",
        type: "string",
      },
      start_date: {
        title: "start_date",
        type: "html",
        valuePrepareFunction: (value) => {
          return new Date(value).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          });
        },
      },
      estimation_time: {
        title: "estimation_time",
        type: "string",
      },
      developer_name: {
        title: "developer_name",
        type: "number",
      },

      state: {
        title: "state",
        type: "number",
      },

      file: {
        title: "file",
        type: "custom",
        renderComponent: UploadFileComponent,ListFilesComponent
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  tasks: any[] ;
  _idProjectSelected: any = "";
  projects:any[]
  constructor(
    private dialogService: NbDialogService,
    private taskService: TaskService,
    private apollo: Apollo,
    private passingdata: PassingDataService,
    private projectService:ProjectService
  ) {}
  rowSelected(event) {
    console.log("rowSelected", event);
    this._idProjectSelected = event._id; // Assuming projectId is the ID you want to pass
  }

  // delete un row in the table
  onDeleteConfirm(event): void {
    console.log(event, "event");
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
      this.removeTask(event);
    } else {
      event.confirm.reject();
    }
  }
  removeTask(event) {
    console.log(event.data._id, "data");
    this.apollo
      .mutate<any>({
        mutation: this.taskService.removeTask(event.data._id),
      })
      .subscribe(({ data }) => {
        console.log("removed data", data);
        this.source.load(this.tasks);
      });
  }
  
  // pour faire update d'un projet
  onEditConfirm(event) {
    console.log(event, "event");
    this.edit(event);
  }
  edit(event) {
    console.log(event, "here event");
    this.apollo
      .mutate<any>({
        mutation: this.taskService.edit(event.newData),
      })
      .subscribe(({ data }) => {
        console.log("Updated data", data);
      });
  }
  async getTasks() {
    this.apollo
      .query<any>({
        query: this.taskService.getTasks(),
      })
      .subscribe(({ data }) => {
        console.log("all data", data);
        this.tasks = data.getTasks;
        console.log("ssssssssss", this.tasks);
      });
  }

    // ouvrir dialogue pour la création du tache
  addTaskDialog() {
    const dialogReference = this.dialogService.open(AddTaskComponent, {
      context: {},
    });
    dialogReference.onClose.subscribe(() => {
      this.getTasks(); // Rechargez les tasks après la fermeture du dialogue
    });
  }
  getProjects() {
    this.apollo
      .query<any>({
        query: this.projectService.getProjects(),
      })
      .subscribe(({ data }) => {
        console.log("projects", data);
        this.projects = data.getProjects;
      });
  }
  async getTasksToProject(id) {
    await this.apollo
      .query<any>({
        query: this.taskService.getAllTasksToproject(id),
      })
      .subscribe(({ data }) => {
        console.log("all data", data);
        this.tasks = data.getTasksToProject;

        this.source.load(this.tasks);
      });
  }
  changeProject(event) {
    console.log("projectId:", event);
    this.getTasksToProject(event);
    console.log(event, "event");
  }
  ngOnInit() {
    //   this.getTasksByProject()
    this.getTasks();
    this.getProjects();
  }
  getUserRowSelected(rowSelected) {
    console.log("before", this._idProjectSelected);
    this._idProjectSelected = rowSelected.data._id;

    console.log("after", this._idProjectSelected);

    console.log(this._idProjectSelected, "selectedRowId in parent component:");
    this.passingdata.changeMessage(this._idProjectSelected);
    console.log("rowSelecteddddddd", rowSelected);

    this._idProjectSelected = '';
  }
}
