/*
import { Injectable, inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
 
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  
} from "@angular/router";

import { Apollo } from "apollo-angular";
import { LoginService } from '../../../@core/mock/auth.service'; 


@Injectable({
  providedIn: "root",
})
class GuardAuth  {
  constructor(
    private apollo: Apollo,
    private userService: LoginService,
    private router: Router,

  ) {}

  isAuth() {
    const token = localStorage.getItem("token");
    return token;
  }

  async getUser() {
    let user = this.apollo
      .query<any>({query: this.userService.getUserByToken()}).toPromise();
    // console.log("This is user from graphql in guard", user);
    return user;
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let user = await this.getUser();

    if (this.isAuth()) {
      if (
        route.data.role &&
        route.data.role.includes(user.data.getTokenData.role)
      ) {
        return true;
      }
      this.router.navigate(["/auth"]);

      return false;
    }
    localStorage.removeItem("token");
    this.router.navigate(["/auth"]);

    return false;
  }
}

}
*/

import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChildFn,
} from "@angular/router";
import { LoginService } from "../../../@core/mock/auth.service";
import { inject } from "@angular/core";

export const canActivate: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(LoginService); // Assuming LoginService has a constructor
  const router = inject(Router); // Assuming Router has a constructor

  const token = localStorage.getItem("token");
console.log('route.data',  route.data)
  console.log('token',token)
  if (token)  {
    console.log("You are allowed")
    return true;
  }

 
  else{
    console.log("You are not allowed")
    
    
    router.navigate(["/auth"]);
  return false;


} 


};
