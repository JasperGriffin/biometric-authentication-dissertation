import { Injectable } from '@angular/core';
import { KeystrokesTemplate } from '../components/public/users/keystrokes-templates'; 

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  private keystrokes;

  constructor() {
    this.keystrokes = KeystrokesTemplate;
  }

  getUser(user: any) {

    //console.log("user.keydowns.length: " + user.keydowns.length);

    this.setUsername(user); 
    this.setMousemove(user);
    this.setKeystrokes(user); 

    for (var i = 0; i < 3; i++) {
      
      this.calcDownLatency(user, i); 
      this.calcUpLatency(user, i);
      this.calcHoldDuration(user, i);
      this.calcReleaseDuration(user, i);
    }

    return this.keystrokes;
  }

  setUsername(user: any) {
    this.keystrokes.username = user.username; 
  }

  setKeystrokes(user: any) {
    this.keystrokes.keystrokes = user.sentence[0].keypresses;
  }

  setMousemove(user: any) {
    this.keystrokes.mousemove = user.mousemove; 
  }

  calcDownLatency(user: any, j: number) {
    for (var i = 0; i < user.sentence[j].keydowns.length - 1; i++) {
      var keyDown = user.sentence[j].keydowns[i + 1] - user.sentence[j].keydowns[i];  
      this.keystrokes.key[j].keydownLatency.push(keyDown); 
    }
  }

  calcUpLatency(user: any, j: number) {
    for (var i = 0; i < user.sentence[j].keyups.length - 1; i++) {
      var keyUp = user.sentence[j].keyups[i + 1] - user.sentence[j].keyups[i]; 
      this.keystrokes.key[j].keyupLatency.push(keyUp);
    }
  }

  calcHoldDuration(user: any, j: number) {
    for (var i = 0; i < user.sentence[j].keydowns.length; i++) {
      var holdingTime = user.sentence[j].keyups[i] - user.sentence[j].keydowns[i];
      this.keystrokes.key[j].holdingDuration.push(holdingTime); 
    }
  }  

  calcReleaseDuration(user: any, j: number) {
    for (var i = 0; i < user.sentence[j].keyups.length - 1; i++) {
      var releaseTime = user.sentence[j].keydowns[i+1] - user.sentence[j].keyups[i];
      this.keystrokes.key[j].releaseDuration.push(releaseTime); 
    }
  }

  reset(num: number) {
    /*this.keystrokes.username = '';
    this.keystrokes.keystrokes = [];
    this.keystrokes.keydownLatency = []; 
    this.keystrokes.keyupLatency = []; 
    this.keystrokes.holdingDuration = [];
    this.keystrokes.releaseDuration = []; 
    this.keystrokes.mousemove = 0; */
  }
}

