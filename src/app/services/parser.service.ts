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
    this.setMousemove(user);
    this.calcDownLatency(user); 
    this.calcUpLatency(user);
    this.calcHoldDuration(user);
    this.calcReleaseDuration(user);

    return this.keystrokes;
  }

  setUsername(user: any) {
    this.keystrokes.username = user.username; 
  }

  setKeystrokes(user: any) {
    this.keystrokes.keystrokes = user.keypresses;
  }

  setMousemove(user: any) {
    this.keystrokes.mousemove = user.mousemove; 
  }

  calcDownLatency(user: any) {
    for (var i = 0; i < user.keydowns.length - 1; i++) {
      var keyDown = user.keydowns[i + 1] - user.keydowns[i];  
      this.keystrokes.keydownLatency.push(keyDown); 
    }
  }

  calcUpLatency(user: any) {
    for (var i = 0; i < user.keyups.length - 1; i++) {
      var keyUp = user.keyups[i + 1] - user.keyups[i]; 
      this.keystrokes.keyupLatency.push(keyUp);
    }
  }

  calcHoldDuration(user: any) {
    for (var i = 0; i < user.keydowns.length; i++) {
      var holdingTime = user.keyups[i] - user.keydowns[i];
      this.keystrokes.holdingDuration.push(holdingTime); 
    }
  }  

  calcReleaseDuration(user: any) {
    for (var i = 0; i < user.keyups.length - 1; i++) {
      var releaseTime = user.keydowns[i+1] - user.keyups[i];
      this.keystrokes.releaseDuration.push(releaseTime); 
    }
  }

  reset() {
    this.keystrokes.username = '';
    this.keystrokes.keystrokes = [];
    this.keystrokes.keydownLatency = []; 
    this.keystrokes.keyupLatency = []; 
    this.keystrokes.holdingDuration = [];
    this.keystrokes.releaseDuration = []; 
    this.keystrokes.mousemove = 0; 
  }
}

