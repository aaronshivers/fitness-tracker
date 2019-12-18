import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => {
  return redirectUnauthorizedTo([ 'login' ]);
};
const redirectLoggedInToTraining = () => {
  return redirectLoggedInTo([ 'training' ]);
};

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'training',
    loadChildren: () => import('./exercise/exercise.module').then(
      module => module.ExerciseModule),
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(
      module => module.AuthModule),
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectLoggedInToTraining },
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {
}
