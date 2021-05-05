import { TypeCheckCompiler } from '@angular/compiler/src/view_compiler/type_check_compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CheckboxComponent } from './checkbox/checkbox.component';

@Component({
  providers: [CheckboxComponent],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userInput: string = 'test'; //The quick brown fox jumped over the lazy dog
  userInputArray = new Array();

  constructor(
    private router: Router,
    ) {}

  ngOnInit(): void {}

  userForm = new FormGroup({
    username : new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('User#[0-9]{4}')])),

    sentence : new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern(this.userInput)])),

    checkbox : new FormControl('', [(control) => {    
      return !control.value ? { 'required': true } : null;
    }]
    )
  });

  get username() { return this.userForm.get('username');  }

  get sentence() { return this.userForm.get('sentence'); }

  get checkbox() { return this.userForm.get('checkbox'); }

  clearValue() {
    this.sentence?.reset(); 

    //reset array
  }
  
  onKeyPress(event: any) {

    /*var str = event.target.value; 

    if (this.userInputArray.length === 0) {
      this.userInputArray.push(str);
    }
    else {
      var lastVal = str.charAt(str.length - 1);
      this.userInputArray.push(lastVal);

    }*/

    console.log(event.key + ' is being pressed');
    console.log("keypress:" + event.timeStamp); 

    //console.log("Array: " + this.userInputArray.toString());
    
  }

  onKeyUp(event: any) {

    //make this a separate method
    //if size is bigger than one, for loop and split into array and read last value

    //condition that checks if value is next one in the sequence
    //else force the user to restart with a button included and restarts the logging

    
  }

  onKeyDown(event: any) {
    console.log(event.key + ' is being pressed down');
    console.log("keydown:" + event.timeStamp); 
    // need a function to wipe data on detecting if input has become empty
  }

  validateInput(event: any) {
    console.log("This is checking the sentence you've typed"); 


    const regex = new RegExp(event.target.value);

    if (regex.test(this.userInput)) {
      console.log(event.target.value + ' is being pressed up [checkInput]'); 
      console.log("keyup: " + event.timeStamp); 
    }
    else {
      this.sentence?.markAllAsTouched(); 
    }
  }

  complete: boolean = false;
  
  checkComplete(event: any) {
    this.complete = event; 
  }

  onSubmit() {

    if (this.username?.invalid) {
      this.username?.markAllAsTouched(); 
    }
    else if (this.sentence?.invalid) {
      this.sentence?.markAllAsTouched(); 
    }
    else if (!this.complete) {
      this.checkbox?.markAsDirty();
    }
    else {

      //this.authService(); 
      
      this.router.navigate(['/', 'login'], {queryParams: { registered: 'true'}})
        .then(nav => {
          console.log("Navigation = " + nav); // true if navigation is successful
        }, err => {
          console.log(err) // when there's an error
          //this.invalidRegistration = false; 
          //this.errorMessage = 'Something went wrong...';
        });
    }
  }

}


