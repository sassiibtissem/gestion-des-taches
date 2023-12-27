import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule } from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth';
import { LoginService } from '../../@core/mock/auth.service';





@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbAuthModule,
    NbCardModule
    ],
    providers:[LoginService]
  
})
export class AuthModule { }
