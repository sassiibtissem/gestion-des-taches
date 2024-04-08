import { LoginService } from "../../../@core/mock/auth.service";

import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";

import { Apollo } from "apollo-angular";

@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  // obj:any={};
  authForm = new FormGroup({
    email: new FormControl(), //to do validators
    password: new FormControl(),
  });

  constructor(
    private authService: LoginService,
    private apollo: Apollo,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    // console.log("🍞", this.authForm.value);

    // localStorage.setItem('token', JSON.stringify(this.authForm.value) )
    const { email, password } = this.authForm.value;
    this.apollo
      .mutate<any>({
        mutation: this.authService.login(email, password),
      })
      .subscribe(({ data }) => {
        console.log("[data]:", data);
        if (data.login != null) {
          localStorage.setItem("token", data.login.access_token);
        }
      });
  }

  // async login(){
  //   this.errorAuth ="";
  //   this.apollo.mutate<any>({
  //     mutation:this.authService.login(email, password),

  //   }).subscribe(async ({data}) =>    {

  //     if(data.login != null){
  //       localStorage.setItem('token',data.login)

  //     this.apollo.query<any>({
  //       query: await this.authService.getUserByToken()
  //     }).subscribe(({ data }) => {
  //       localStorage.setItem('Nom',data.getUserByToken.nom);
  //       localStorage.setItem('Role',data.getUserByToken.role);
  //       localStorage.setItem('_id',data.getUserByToken._id);

  //       this.currentUser = data.getUserByToken;

  //         if(this.currentUser.role == ROLES.ROLE_CLIENT_USER)
  //        this.router.navigate(['/pages/tables/smart-table-depot']);
  //       else if(this.currentUser.role == ROLES.ROLE_CIT_USER)
  //        this.router.navigate(['/pages/tables/consult-circuit']);
  //       else
  //       this.router.navigate(['/pages/dashboard']);
  //    },
  //   );
  //  }
  //   }, async (error) => {
  //     console.error(error);
  //     if (error.graphQLErrors.length > 0) {
  //       this.errorAuth = await this.translate.instant(error.graphQLErrors[0].message);

  //     }
  //   });
  // }
}
