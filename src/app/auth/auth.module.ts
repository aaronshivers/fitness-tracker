import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule
  ],
})
export class AuthModule {
}
