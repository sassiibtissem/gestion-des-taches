import { Ng2SmartTableModule } from 'ng2-smart-table';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbIconModule, NbInputModule, NbLayoutModule, NbSelectModule, NbTreeGridModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';

import { ProjectsRoutingModule } from './projects-routing.module';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectService } from '../../@core/mock/project.service';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { DocumentsComponent } from './documents/documents.component';
import { UploadFormComponent } from './upload-form/upload-form.component';






@NgModule({
  declarations: [
    ProjectComponent,
    AddProjectComponent,
    UploadFileComponent,
    DocumentsComponent,
    UploadFormComponent,
   
   
  ],
  imports: [
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
    ProjectsRoutingModule,
    NbButtonModule,
    NbLayoutModule,NbSelectModule,
    NbDatepickerModule
   
  
    

  ],
  providers:[ProjectService]
})
export class ProjectsModule { }
