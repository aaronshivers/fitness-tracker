import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<User>;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  login(): void {
    const provider = new auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(() => {
      this.router.navigate([ 'training' ]);
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate([ 'login' ]);
    });
  }

  getUser(): Observable<User> {
    return this.user;
  }
}
