import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UiService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private loadingSubscription: Subscription;

  constructor(private authService: AuthService, private uiService: UiService) { }

  ngOnInit(): void {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }

  onLogin(): void {
    this.authService.login();
  }

  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
