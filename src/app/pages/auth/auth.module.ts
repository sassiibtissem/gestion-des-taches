import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
} from "@nebular/theme";
import { NbAuthModule } from "@nebular/auth";
import { LoginService } from "../../@core/mock/auth.service";
import { CreateUserComponent } from "./create-user/create-user.component";
import { AuthRoutingModule } from "./auth-routing.module";


@NgModule({
  declarations: [LoginComponent,CreateUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbAuthModule,
    NbCardModule,
    ReactiveFormsModule,
    NbSelectModule,
    NbRadioModule,
    AuthRoutingModule,
    NbAlertModule
    
    
   
  ],
  providers: [LoginService],
})
export class AuthModule {}
