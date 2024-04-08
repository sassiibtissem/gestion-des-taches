import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateUserComponent } from "./create-user/create-user.component";


export const routes: Routes = [{
  path :'createUser',
  component:CreateUserComponent
}
  //par securité si je ne met rien de tout je fais faire une redirection sur login avec
  //une correspondance parfaite au niveau de mes url.
  // { path :'', redirectTo:'login' , pathMatch:'full'},
  // { path: 'auth', loadChildren: () => import('./auth.module').then(m => m.AuthModule)},
  // { path: 'login',  component: LoginComponent,
  // },
  // {
  //   path:""
  // }
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
