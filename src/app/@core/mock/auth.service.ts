import { gql } from "apollo-angular";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class LoginService {
  constructor() {}
  //respecter les champs de user et type de retour de reponse login(access token et user)
  login(email: string, password: string): any {
    return gql`
          mutation {
            login(
              loginAuthInput: { email: "${email}", password: "${password}" }
            ) {
              access_token
            }
          }
        `;
  }
}
