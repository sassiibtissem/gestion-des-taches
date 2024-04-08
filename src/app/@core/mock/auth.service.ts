import { gql } from "apollo-angular";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs-compat";

@Injectable()
export class LoginService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() {}

  // Méthode pour vérifier si l'utilisateur est connecté
  public isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // ... autres méthodes du service (login, logout, etc.)

  
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
 createUser(newUserData:any){
  return gql`
  mutation {
    createUser(createUserInput: {
     
      firstName: "${newUserData.firstName}",
      lastName: "${newUserData.lastName}",
      email: "${newUserData.email}",
      password: "${newUserData.password}",
      cin: "${newUserData.Cin}",
      role:"${newUserData.role}"
    }) {
      
      firstName
      lastName
      email
      password
      cin
      role
  
    }
  }
  `
 }
 getUser(){
  return gql`
  query {
    getDevelopers{
      _id
      firstName
      lastName
        
        
        
       }
    }
    
  `
}
}
