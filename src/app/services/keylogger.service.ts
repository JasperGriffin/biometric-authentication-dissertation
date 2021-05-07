import { Injectable } from '@angular/core';
import { UserTemplate } from '../components/public/users/user-template';

@Injectable({
  providedIn: 'root'
})
export class KeyloggerService {

  private user: UserTemplate;

  constructor() {
    this.user = new UserTemplate();
  }

  getUser() {
    return this.user; 
  }

  initialiseName(username: string) {
    this.user.username = username; 
  }

  onKeyUp(event: any) {
    if (event.key !== 'Tab') {
      this.user.keyups.push(event.timeStamp);
      console.log("keyups: " + this.user.keyups.toString()); 
    }
  }

  onKeyDown(event: any) {

    if (event.key !== 'Tab') {
      this.user.keydowns.push(event.key); //timeStamp
      console.log("keydowns: " + this.user.keydowns.toString()); 

    }
  }

  /*Keypresser doesn't record delete, space, etc*/
  onKeyPress(event: any) {

    this.user.keypresses.push(event.key);
    console.log("keypresses: " + this.user.keypresses.toString());  
  }

  reset() {
    this.user.keydowns = [];
    this.user.keyups = []; 
    this.user.keypresses = [];
  }
}
