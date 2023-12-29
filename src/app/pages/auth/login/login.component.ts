import { LoginService } from "../../../@core/mock/auth.service";

import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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

  constructor(private authService: LoginService, private apollo: Apollo) {}

  ngOnInit(): void {}

  login() {
    console.log("🍞", this.authForm.value);
    const { email, password } = this.authForm.value;
    this.apollo
      .mutate<any>({
        mutation: this.authService.login(email, password),
        errorPolicy: "all",
      })
      .subscribe(({ data, errors, loading }) => {
        console.log("🍦[loading]:", loading);
        console.log("🍏[errors]:", errors);
        console.log("🍇[data]:", data);
      });
  }
}
