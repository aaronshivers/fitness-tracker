import { NgModule } from '@angular/core';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { TrainingComponent } from './training/training.component';
import { RouterModule, Routes } from '@angular/router';

const redirectUnauthorizedToLogin = () => {
  return redirectUnauthorizedTo([ 'login' ]);
};

const routes: Routes = [
  {
    path: 'training',
    component: TrainingComponent,
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TrainingRoutingModule {
}
