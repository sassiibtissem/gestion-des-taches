import { RouterModule, Routes } from "@angular/router";
import { TaskComponent } from "./task/task.component";
import { NgModule } from "@angular/core";
import { ListToDoComponent } from "./list-to-do/list-to-do.component";





 export const routes :Routes =[{
    path:'task-table',
    component:TaskComponent
},
{path:'list-to-do',
    component:ListToDoComponent}
 ]
@NgModule({
    imports: [RouterModule.forChild(routes)],
      exports:[RouterModule],
  })
  export class TasksRoutingModule{}
