import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    AuthRoutingModule,
    AngularFireAuthModule,
    SharedModule,
  ],
})
export class AuthModule {
}
