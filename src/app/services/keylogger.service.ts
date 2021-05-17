import { Injectable } from '@angular/core';
import { UserTemplate } from '../components/public/users/user-template';

@Injectable({
  providedIn: 'root'
})

export class KeyloggerService {

  //private user: UserTemplate; 
  private user;
  private mousemove: number = 0; 
  private num: number = 0; 
  private ID: number = 4; 

  constructor() {
    this.user = UserTemplate;
    //this.user = new UserTemplate();
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
      this.num = event.path[this.ID].id;
      this.user.sentence[this.num].keyups.push(event.timeStamp);
      console.log("keyups: " + this.user.sentence[this.num].keyups.toString()); 
    }
  }

  onKeyDown(event: any) {
    if (event.key !== 'Tab') {
      this.num = event.path[this.ID].id;
      this.user.sentence[this.num].keydowns.push(event.timeStamp);
      console.log("keydowns: " + this.user.sentence[this.num].keydowns.toString()); 
    }
  }

  /*Keypresser doesn't record delete, space, etc*/
  onKeyPress(event: any) {
    this.num = event.path[this.ID].id;
    this.user.sentence[this.num].keypresses.push(event.key);
    console.log("keypresses: " + this.user.sentence[this.num].keypresses.toString()); 
  }

  onMouseMove(event: any) {
    this.mousemove++; 
  }

  reset(num: number) {

    console.log('num in keylogger: ' + num); 

    this.user.username = ''; 
    this.user.mousemove = 0;
    this.user.sentence[num].keydowns = [];
    this.user.sentence[num].keyups = []; 
    this.user.sentence[num].keypresses = [];
  }

  clear() {

    this.user.username = '';
    this.user.mousemove = 0;

    for (var i = 0; i < 3; i++) {
      this.user.sentence[i].keydowns = [];
      this.user.sentence[i].keyups = []; 
      this.user.sentence[i].keypresses = []; 
    }
  }

  
}
