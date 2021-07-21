import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    // return this.loggedIn.asObservable();
    if(localStorage.getItem('loginStatus'))
      this.loggedIn.next(true);
    else
        this.loggedIn.next(false);
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) {}

  login(user: User) {
    if (user.username == 'fingent' && user.password == 'fingent' ) {
      localStorage.setItem('loginStatus','loggedIn')
      this.router.navigate(['dashboard']);
    }else{
        this.loggedIn.next(false);
    }
  }

  logout() {
    localStorage.removeItem('loginStatus')
    this.router.navigate(['']);
  }
}