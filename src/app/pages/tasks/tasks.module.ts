import { NgModule } from "@angular/core";
import { TaskComponent } from "./task/task.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbDialogService, NbIconModule, NbInputModule, NbLayoutModule, NbRadioModule, NbSelectModule, NbTreeGridModule } from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import { Ng2SmartTableModule } from "ng2-smart-table";

import { TasksRoutingModule } from "./tasks-routing.module";
import { AddTaskComponent } from './add-task/add-task.component';
import { ListToDoComponent } from './list-to-do/list-to-do.component';
import { ToDoComponent } from './to-do/to-do.component';

@NgModule({
    declarations:[
        TaskComponent,
        AddTaskComponent,
        ListToDoComponent,
        ToDoComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        NbCardModule,
        NbTreeGridModule,
        NbIconModule,
        NbInputModule,
        ThemeModule,
        Ng2SmartTableModule,
        TasksRoutingModule ,
        NbButtonModule,
        NbLayoutModule,NbSelectModule,
        NbDatepickerModule ,
        NbRadioModule,
     
        
     
    ],
    providers:[]
}) 
export class TasksModule{}