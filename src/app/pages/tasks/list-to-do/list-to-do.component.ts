import { Component } from "@angular/core";
import { TaskService } from "../../../@core/mock/task.service";
import { LocalDataSource } from "ng2-smart-table";

import { Apollo } from "apollo-angular";
import { LoginService } from "../../../@core/mock/auth.service";
import { ProjectService } from "../../../@core/mock/project.service";

@Component({
  selector: "ngx-list-to-do",
  templateUrl: "./list-to-do.component.html",
  styleUrls: ["./list-to-do.component.scss"],
})
export class ListToDoComponent {
  constructor(
    private taskService: TaskService,
    private userService: LoginService,
    private projectService: ProjectService,
    private apollo: Apollo
  ) {}
  tasks: any = [];
  projectId = "";
  source: LocalDataSource = new LocalDataSource();
  user: any = [];
  projects: any = [];

  getUser() {
    this.apollo
      .query<any>({
        query: this.userService.getUser(),
      })
      .subscribe(({ data }) => {
        this.user = data.getDevelopers;
        console.log("dataaaa", this.user);
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
  async upDateState(taskId, newState) {
    try {
      const { data } = await this.apollo.mutate<any>({
          mutation: this.taskService.upDateTaskState(taskId, newState),
      }).toPromise();

      if (data && data.updateTaskState) {
          // Handle the response data here
      } else {
          console.error('Invalid data returned from mutation');
      }
  } catch (error) {
      console.error('Error in mutation:', error);
  }
  
  }
  getProjects() {
    this.apollo
      .query<any>({
        query: this.projectService.getProjects(),
      })
      .subscribe(({ data }) => {
        console.log("projectssss", data);
        this.projects = data.getProjects;
      });
  }
  ngOnInit() {
    this.getProjects();

    this.getUser();
    this.getTasksToProject;
  }

  changeProject(event) {
    console.log("projectId:", event);
    this.getTasksToProject(event);
    console.log(event, "evennnnnnnnttttttttt");
  }
  currentItem: any;

  filterTickets(state: string) {
    if (!Array.isArray(this.tasks)) {
      console.error("Tasks is not an array");
      return [];
    }

    return this.tasks.filter((m) => m.state === state);
  }
  onDragStart(item: any) {
    this.currentItem = item;
  }

  onDrop(event: any, status: string) {
    console.log("ondrop");
    event.preventDefault();

    if (this.currentItem) {
      const record = this.tasks.find((m) => {
        console.log(m.id, "id");
        console.log(this.currentItem.id, "current id");
        return m.id == this.currentItem.id;
      }); // boolean

      if (record) {
        record.state = status;
        //update apollo
        this.upDateState(this.currentItem.id, status);
      }
      console.log("ticketId", record);
      this.currentItem = null;
    } else {
      console.error("Current item is undefined ");
    }
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  // apollo query : charge list of tasks using switch case
  //  query : list of tasks by project
}
