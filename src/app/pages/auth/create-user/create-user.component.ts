import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Apollo } from "apollo-angular";
import { LoginService } from "../../../@core/mock/auth.service";
import Swal from "sweetalert2";
@Component({
  selector: "ngx-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.scss"],
})
export class CreateUserComponent {
  tab: any = ["admin", "developer", "projectLeader"];
  newUserForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: LoginService,

    private apollo: Apollo
  ) {}
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.newUserForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      Cin: ["", Validators.required],
      role: ["", Validators.required],
    });
  }
  createUser() {
    this.apollo
      .mutate<any>({
        mutation: this.authService.createUser(this.newUserForm.value),
      })
      .subscribe(
        ({ data }) => {
          Swal.fire("User created successfully!", "", "success").then(() => {
            this.newUserForm.reset();
          })
          ;
        },
        (error) => {
          Swal.fire("Failed to create user. Please try again.", "", "error");
        }
      );
  }
}
