import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProjectComponent } from "./project/project.component";
import { AddProjectComponent } from "./add-project/add-project.component";
import { ListFilesComponent } from "./list-files/list-files.component";


export const routes :Routes=[{
    path:'project-table',
    component:ProjectComponent
},
{ path:'add-project',
component:AddProjectComponent},
{
  path:'documents',
  component:ListFilesComponent
},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
    exports:[RouterModule],
})
export class ProjectsRoutingModule{}