import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';

const MaterialComponents = [
  MatButtonModule,
  MatIconModule
];

@NgModule({
  imports: [ MaterialComponents ],
  exports: [ MaterialComponents ],
})
export class MaterialModule {
}
