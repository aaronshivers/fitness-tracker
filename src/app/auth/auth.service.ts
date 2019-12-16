import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { ExerciseService } from '../exercise.service';
import { UiService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<User>;

  constructor(private router: Router, private afAuth: AngularFireAuth, private exerciseService: ExerciseService, private uiService: UiService) {
    this.user = afAuth.authState;
  }

  initAuthListener() {
    this.afAuth.authState.subscribe((user: User | null) => {
      if (user) {
        this.router.navigate([ 'training' ]);
      } else {
        this.exerciseService.cancelSubscriptions();
        this.router.navigate([ 'login' ]);
      }
    });
  }

  login(): void {
    this.uiService.loadingStateChanged.next(true);
    const provider = new auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(() => {
      this.uiService.loadingStateChanged.next(false);
    });
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }

  getUser(): Observable<User> {
    return this.user;
  }
}
