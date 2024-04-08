import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from "@nebular/auth";
import { LoginComponent } from "./pages/auth/login/login.component";
import { canActivate } from "./pages/auth/Guard/auth.guard";
import { CreateUserComponent } from "./pages/auth/create-user/create-user.component";
//import { AuthGuard } from "./pages/auth/Guard/auth.guard";

export const routes: Routes = [
  {
    path: "pages",
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
  },
  {
    path: "auth",
    component: NbAuthComponent,

    children: [
      {
        path: "",

        component: LoginComponent,
      },
      {
        path: "login",
        component: LoginComponent,
        // canActivate:[canActivate] // utilisation d auth guard
      },
      {
        path: "register",
        component: NbRegisterComponent,
      },
      {
      //   path: "createUser",
      //   component: CreateUserComponent,
      // },
      
        path: "logout",
        component: NbLogoutComponent,
      },
      {
        path: "request-password",
        component: NbRequestPasswordComponent,
      },
      {
        path: "reset-password",
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: "", redirectTo: "pages", pathMatch: "full" },
  { path: "**", redirectTo: "pages" },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
