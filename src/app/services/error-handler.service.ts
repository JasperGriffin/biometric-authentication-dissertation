import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private router: Router
  ) { }

  setErrorMessage(err: any) {
    if (err.error['status'] === 'UserDuplication') {
      this.router.navigate(['/', 'register'], {queryParams: { error: err.error['error']}})
    }
    else if (err.error['status'] === 'SentenceError') {
      this.router.navigate([], {queryParams: { error: err.error['error']}})
    }
    else if (err.error['status'] === 'BotDetection') {
      this.router.navigate([], {queryParams: { error: err.error['error']}})
    }
    else if (err.error['status'] === 'DatabaseDisconnected') {
      this.router.navigate([], {queryParams: { error: err.error['error']}})
    }
    else if (err.error['status'] === 'UserDoesNotExist') {
      this.router.navigate(['/', 'login'], {queryParams: { error: err.error['error']}})
    }
  }

  getErrorMessage(params: any) {

    if (params.error !== undefined && params.error === 'UserAlreadyExists') {
      return "User already exists, use a different username.";
    }
    else if (params.error !== undefined && params.error === 'SentencesMatchError') {
      return "Sentence length did not match. Make sure to not include characters like tab or ctrl.";
    }
    else if (params.error !== undefined && params.error === 'BotDetected') {
      return "Mouse movement is not legitimate, may be a bot.";
    }
    else if (params.error !== undefined && params.error === 'DatabaseCouldNotConnect') {
      return "Database could not connect. Check with the administrators.";
    }
    else if (params.error !== undefined && params.error === 'UnknownUser')  {
      return "User does not exist.";
    }
    else {
      return '';
    }
  }

 
}
