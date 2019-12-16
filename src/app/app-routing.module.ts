import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training/training.component';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([ 'login' ]);
const redirectLoggedInToTraining = () => redirectLoggedInTo([ 'training' ]);

const Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [ AngularFireAuthGuard ], data: { authGuardPipe: redirectLoggedInToTraining }},
  {
    path: 'training',
    component: TrainingComponent,
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectUnauthorizedToLogin }},
];

@NgModule({
  imports: [ RouterModule.forRoot(Routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {
}
