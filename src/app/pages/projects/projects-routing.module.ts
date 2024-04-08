import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProjectComponent } from "./project/project.component";
import { AddProjectComponent } from "./add-project/add-project.component";


export const routes :Routes=[{
    path:'project-table',
    component:ProjectComponent
},
{ path:'add-project',
component:AddProjectComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
    exports:[RouterModule],
})
export class ProjectsRoutingModule{}