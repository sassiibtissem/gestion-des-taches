import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassingDataService {

  private messageSource = new BehaviorSubject<string>("");
  currentMessage = this.messageSource.asObservable();
  
  constructor() { }

  changeMessage(message: string) {
    console.log("the message : ", message)
    this.messageSource.next(message);
  }
}
