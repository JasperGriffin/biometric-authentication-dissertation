/*
 * SOURCE: https://material.angular.io/components/checkbox/examples
*/

import { Component, EventEmitter, Output } from '@angular/core';
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
    //@Input() checkComplete: boolean = this.allComplete; 
    @Output() update: EventEmitter<boolean> = new EventEmitter<boolean>(); 

    updateAllComplete() {
        this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
        this.update.emit(this.allComplete);
    }

    someComplete(): boolean {
        if (this.task.subtasks == null) {
        return false;
        }
        return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
    }

    setAll(completed: boolean) {
        this.allComplete = completed;
        this.update.emit(this.allComplete);
        if (this.task.subtasks == null) {
            return;
        }
        this.task.subtasks.forEach(t => t.completed = completed);
    }   
}

