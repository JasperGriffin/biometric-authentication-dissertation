import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  allComplete: boolean = false;
  errorMessage: string = ''; 

  value = ''; 

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {}

  task: Task = {
    name: 'I have read the information sheet and agreed to the consent form',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'I consent to the logging of my keyboard patterns for authorisation', completed: false, color: 'primary'},
      {name: 'I consent to the logging my my mouse movement for identification', completed: false, color: 'accent'},
      {name: 'I consent to the authorised access of my account for testing purposes', completed: false, color: 'warn'}
    ]
  };


  userForm = new FormGroup({
    username : new FormControl('', Validators.compose([
      Validators.required,
      //Validators.pattern('User#[0-9]{4}')])),
      Validators.pattern('test')])),

    sentence : new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('The quick fox jumped over the lazy dog')])),
    accept : new FormControl('', [(control) => {    
      return !control.value ? { 'required': true } : null;
    }]
    )
  });

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }

  onKeyUp(event: any) {

    var temp = ''

    //make this a separate method
    //if size is bigger than one, for loop and split into array and read last value

    //condition that checks if value is next one in the sequence
    //else force the user to restart with a button included and restarts the logging


    console.log(event.target.value + 'Key is being pressed up'); 
    console.log(event.timeStamp); 

    //
  }

  onKeyDown(event: any) {
    console.log('Key is being pressed down');

    // need a function to wipe data on detecting if input has become empty
  }

  onKeyPress(event: any) {
    console.log('Key is being pressed'); 
  }

  onSubmit() {

    if (this.userForm.get('username')?.invalid) {
      this.userForm.get('username')?.markAllAsTouched(); 
    }
    else if (this.userForm.get('sentence')?.invalid) {
      this.userForm.get('sentence')?.markAllAsTouched(); 
    }
    else if (!this.allComplete) {
      this.userForm.get('accept')?.markAsDirty();
    }
    else {
      
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
