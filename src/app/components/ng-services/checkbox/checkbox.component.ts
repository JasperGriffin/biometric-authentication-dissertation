/*
 * SOURCE: https://material.angular.io/components/checkbox/examples
*/

import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

export interface Task {
    name: string;
    completed: boolean;
    color: ThemePalette;
    subtasks?: Task[];
}
@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent  {

    
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

    allComplete: boolean = false;

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

    validate() {
      if (this.allComplete) {
        return true;
      }
      else {
        this.allComplete = true;
        return this.allComplete;
      }
    }
}

