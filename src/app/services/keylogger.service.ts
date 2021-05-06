import { Injectable } from '@angular/core';
import { UserTemplate } from '../components/public/users/logs';

@Injectable({
  providedIn: 'root'
})
export class KeyloggerService {

  private user: UserTemplate;

  constructor() {
    this.user = new UserTemplate();
  }

  onKeyUp(event: any) {
    this.user.keyups.push(event.timeStamp); 
    console.log("KeyUp array: " + this.user.keyups.toString()); 
  }

  onKeyDown(event: any) {
    this.user.keydowns.push(event.timeStamp);
    console.log("KeyDown array: " + this.user.keydowns.toString()); 
  }

  onKeyPress(event: any) {
    this.user.keypresses.push(event.key);
    console.log("keypresses: " + this.user.keypresses.toString());  
  }
 
  reset() {
    this.user.keydowns = [];
    this.user.keyups = []; 
    this.user.keypresses = [];
  }

  createUser() {
    //pass in username onSubmit() 
  }
}
