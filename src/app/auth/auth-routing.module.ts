import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

const redirectLoggedInToTraining = () => {
  return redirectLoggedInTo([ 'training' ]);
};

const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectLoggedInToTraining },
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class AuthRoutingModule {
}
