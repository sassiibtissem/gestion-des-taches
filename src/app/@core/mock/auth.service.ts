import { gql } from 'apollo-angular';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';



@Injectable()
export class LoginService {


    constructor(){

    }
//respecter les champs de user et type de retour de reponse login(access token et user)
    Login(email, password) : any {
        return gql `mutation {
          login(
            loginUserInput:{
    
           email : "${email}"  
           password : "${password}" 
          }          
          )
          {  
            access_token,     
              user{_id,firstName,lastName,email,password,cin}
             }
           
    
       }`
    }

}