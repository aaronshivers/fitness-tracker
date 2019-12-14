import { NgModule } from '@angular/core';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training/training.component';
import { RouterModule } from '@angular/router';

const Routes = [
  // { path: '', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'training', component: TrainingComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(Routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {
}
