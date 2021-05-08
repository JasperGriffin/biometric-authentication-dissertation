import { Injectable } from '@angular/core';
import { KeystrokesTemplate } from '../components/public/users/keystrokes-templates'; 

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  private keystrokes: KeystrokesTemplate;

  constructor() {
    this.keystrokes = new KeystrokesTemplate();
  }

  getUser(user: any) {

    console.log("user.keydowns.length: " + user.keydowns.length);

    this.setUsername(user); 
    this.setKeystrokes(user); 
    this.calcDownLatency(user); 
    this.calcHoldDuration(user);

    return this.keystrokes;
  }

  setUsername(user: any) {
    this.keystrokes.username = user.username; 
  }

  setKeystrokes(user: any) {
    this.keystrokes.keystrokes = user.keypresses
  }

  calcDownLatency(user: any) {
    for (var i = 0; i < user.keydowns.length - 1; i++) {
      var keyDown = user.keydowns[i + 1] - user.keydowns[i];  
      this.keystrokes.keydownLatency.push(keyDown); 
    }
  }

  calcHoldDuration(user: any) {
    for (var i = 0; i < user.keydowns.length; i++) {
      var holdingTime = user.keyups[i] - user.keydowns[i]
      this.keystrokes.holdingDuration.push(holdingTime); 
    }
  }  
}

