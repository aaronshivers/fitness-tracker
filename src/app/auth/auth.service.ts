import { Injectable } from '@angular/core';
import { User } from './user';
import { AuthData } from './auth-data';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString(),
    };
    this.afterAuthenticating();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString(),
    };
    this.afterAuthenticating();
  }

  logout() {
    this.user = null;
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return {
      ...this.user,
    };
  }

  isLoggedIn() {
    return this.user !== null;
  }

  private afterAuthenticating() {
    this.isAuthenticated.next(true);
    this.router.navigate(['/training']);
  }
}
