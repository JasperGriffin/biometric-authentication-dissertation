import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


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
  errorMessage = ''; 

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

    //https://stackoverflow.com/questions/54043977/angular-redirect-to-login-after-register-and-show-a-message
  }

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
      Validators.pattern('User#[0-9]{4}')])),
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
      
      this.router.navigate(['/', 'login'])
        .then(nav => {
          console.log(nav); // true if navigation is successful
        }, err => {
          console.log(err) // when there's an error
          //this.invalidRegistration = false; 
          //this.errorMessage = 'Something went wrong...';
        });
    }
  }

}
