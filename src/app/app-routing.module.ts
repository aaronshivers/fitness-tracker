import { NgModule } from '@angular/core';
import { TrainingComponent } from './training/training/training.component';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => {
  return redirectUnauthorizedTo([ 'login' ]);
};

const Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'training',
    component: TrainingComponent,
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(Routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {
}
