import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UiService } from '../../shared/ui.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ],
})
export class LoginComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private uiService: UiService,
    private store: Store<{ ui: fromApp.State }>,
  ) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(
      map(state => state.ui.isLoading),
    );
  }

  onLogin(): void {
    this.authService.login();
  }
}
