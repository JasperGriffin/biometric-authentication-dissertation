import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckboxComponent } from './checkbox/checkbox.component';

import { KeyloggerService } from '../../../services/keylogger.service';
import { ParserService } from '../../../services/parser.service';
import { AuthService } from '../../../services/auth.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  providers: [CheckboxComponent],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userInput: string = 'consider problem without'; //The quick brown fox jumped over the lazy dog
  userInputArray = new Array();
  complete: boolean = false;
  valid: boolean[] = [true,true,true]; 
  anotherValid: boolean[] = [true,true,true]; 
  keyboardID: number = 4; 
  mouseID: number = 6; 
  num: number = 0; 
  errorMessage: string = '';

  constructor(
    private keylogger: KeyloggerService,
    private parser: ParserService,
    private auth: AuthService,
    private error: ErrorHandlerService,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {

    //ErrorHandler(); 
    this.route.queryParams
      .subscribe(params => {
        this.errorMessage = this.error.getErrorMessage(params); 
        if (this.errorMessage.length != 0) {
          this.clearAllValues(); 
        }
      })
  }

  userForm = new FormGroup({
    username : new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('User#[0-9]{4}') 
    ])),

    firstSentence : new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern(this.userInput),
    ])),

    secondSentence : new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern(this.userInput),
    ])),

    thirdSentence : new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern(this.userInput),
    ])),

    checkbox : new FormControl('', [(control) => {    
      return !control.value ? { 'required': true } : null;
    }])
  });

  get username() { return this.userForm.get('username');  }

  get firstSentence() { return this.userForm.get('firstSentence'); }

  get secondSentence() { return this.userForm.get('secondSentence') }

  get thirdSentence() { return this.userForm.get('thirdSentence') }

  get checkbox() { return this.userForm.get('checkbox'); }
  
  //keyboard listeners
  onKeyUp(event: any) { this.keylogger.onKeyUp(event); }

  onKeyDown(event: any) { this.keylogger.onKeyDown(event); }

  onKeyPress(event: any) { this.keylogger.onKeyPress(event); }

  //mouse listener
  @HostListener('mousemove', ['$event'])
  handleMousemove(event: MouseEvent) {
    this.keylogger.onMouseMove(event); 
  }

  validateInput(event: any) {
    /*validateInput doesn't read ctrl, tab, etc so this needs to be done elsewhere*/
    this.num = event.path[this.keyboardID].id;

    const regex = new RegExp(event.target.value);
    if (!regex.test(this.userInput) ||!this.valid) {
      this.valid[this.num] = false; 
      console.log("This sentence is wrong"); 
    }
  }

  //keyboard icon
  clearValue(event: any) {
    //reset specific sentence  
    this.num = event.path[this.mouseID].id; 
    this.checkSentence(this.num)?.reset();
    //reset boolean values
    this.valid[this.num] = true; 
    this.anotherValid[this.num] = true;
    //clear keylogger arrays
    this.keylogger.reset(this.num); 
  }

  clearAllValues() {
    this.username?.reset(); 
    this.firstSentence?.reset();
    this.secondSentence?.reset(); 
    this.thirdSentence?.reset();
    this.checkbox?.reset();
    this.keylogger.clear();
    this.parser.clear();
  }

  checkComplete(event: any) {
    this.complete = event; 
  }

  checkSentence(num: number) {
    if (num == 0) {
      return this.firstSentence; 
    }
    else if (num == 1) {
      return this.secondSentence;
    }
    else if (num == 2) {
      return this.thirdSentence; 
    }
    else {
      return;
    }
  }

  onSubmitValidate() {

    if (this.username?.invalid) {
      return this.username?.markAllAsTouched(); 
    }

    for (var i = 0; i < 3; i++) {
      const sentence = this.checkSentence(i);
      if (sentence?.invalid) {
        return sentence?.markAllAsTouched(); 
      }
      else if (!this.valid[i]) {
        return this.anotherValid[i] = false;
      }
    }

    if (!this.complete) {
      return this.checkbox?.markAsDirty();
    }
    else { return true }
  }


  onSubmit() {
    this.keylogger.initialiseUser(this.username?.value);
    if (this.onSubmitValidate()) {

      const userTemplate = this.keylogger.getUser();
      const user = this.parser.getUser(userTemplate);       
      this.auth.register(user); 
    }  
  }
}


