import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { UiService } from './shared/ui.service';
import { AuthModule } from './auth/auth.module';
import { TrainingModule } from './training/training.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavComponent,
  ],
  imports: [
    AuthModule,
    AngularFireAuthGuardModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    AppRoutingModule,
    LayoutModule,
    TrainingModule,
  ],
  providers: [ UiService ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
