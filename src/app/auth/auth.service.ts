import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { ExerciseService } from '../exercise.service';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<User>;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private exerciseService: ExerciseService,
    private uiService: UiService,
    private store: Store<{ ui: fromRoot.State }>,
  ) {
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
    this.store.dispatch(new UI.StartLoading());
    const provider = new auth.GoogleAuthProvider();

    this.afAuth.auth.signInWithPopup(provider)
      .then(() => {
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }

  getUser(): Observable<User> {
    return this.user;
  }
}
