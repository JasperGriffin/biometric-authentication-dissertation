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
  
    console.log("keyups in parser: " + user.keyups); 
    console.log("keypresses in parser: " + user.keypresses); 
    console.log("LENGTH: " + user.keyups.length)

    //this.calcDownLatency(user); 


  }

  calcDownLatency(user: any) {
    /*for (int i = 0; i < 4; i++) {
    	newarr.push(arr[i+1] - arr[i]);  
    }*/
  }

  calcHoldDuration() {

  }
  
}

/* username: string = '';
    keystrokes: string[] = [];
    keydownLatency: number[] = []; //time between two key presses
    keyupLatency: number[] = []; //time between two key releases
    holdingDuration: number[] = [];  //time between keydown and subsequent keyup
    releaseDuration: number[] = []; //time between keyup and subsequent keydown
}*/
