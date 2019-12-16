import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from 'firebase';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: [ './nav.component.css' ],
})
export class NavComponent implements OnInit {
  user: User;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay(),
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: User) => {
      this.user = user;
    });
  }

  onLogout(): void {
    this.authService.logout();
  }
}
