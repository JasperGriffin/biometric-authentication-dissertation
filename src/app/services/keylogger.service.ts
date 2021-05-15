import { Injectable } from '@angular/core';
import { UserTemplate } from '../components/public/users/user-template';

@Injectable({
  providedIn: 'root'
})


export class KeyloggerService {

  //private user: UserTemplate[] = []; 
  private user;
  private mousemove: number = 0; 


  constructor() {
    this.user = UserTemplate;

    //this.user = new UserTemplate[];
  }
  
  getUser() {
    return this.user; 
  }

  initialiseUser(username: string) {
    this.user.username = username; 
    this.user.mousemove = this.mousemove; 
  }

  onKeyUp(event: any) {
    if (event.key !== 'Tab') {

      const num = event.path[4].id;
      this.user.sentence[num].keyups.push(event.timeStamp);
      console.log("keyups: " + this.user.sentence[num].keyups.toString()); 

    }
  }

  onKeyDown(event: any) {
    if (event.key !== 'Tab') {
      const num = event.path[4].id;
      this.user.sentence[num].keydowns.push(event.timeStamp);
      console.log("keydowns: " + this.user.sentence[num].keydowns.toString()); 
    }
  }

  /*Keypresser doesn't record delete, space, etc*/
  onKeyPress(event: any) {
    const num = event.path[4].id;
    this.user.sentence[num].keypresses.push(event.key);
    console.log("keypresses: " + this.user.sentence[num].keypresses.toString()); 
  }

  onMouseMove(event: any) {
    this.mousemove++; 
  }

  reset() {
    /*this.user.username = ''; 
    this.user.keydowns = [];
    this.user.keyups = []; 
    this.user.keypresses = [];
    this.user.mousemove = 0;*/
  }
}
