import { LoginService } from '../../../@core/mock/auth.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';

import { Apollo } from 'apollo-angular';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
loginForm=FormGroup;
obj:any={};

constructor(private authService: LoginService, private apollo : Apollo){}

ngOnInit(): void {
  this.Login()
}


async Login(){
  this.apollo.mutate<any>({
    mutation: this.authService.Login("John.doe@example.com", "Johnpassword")
  }).subscribe(({ data }) => {
console.log(data,"data")  


});

}
}