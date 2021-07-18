import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) {}

  login(user: User) {
      console.log("angular login",user.username)
    if (user.username == 'fingent' && user.password == 'fingent' ) {
      this.loggedIn.next(true);
      this.router.navigate(['dashboard']);
    }else{
        this.loggedIn.next(false);
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['']);
  }
}