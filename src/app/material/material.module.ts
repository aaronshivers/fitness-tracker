import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';

const MaterialComponents = [
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule
];

@NgModule({
  imports: [ MaterialComponents ],
  exports: [ MaterialComponents ],
})
export class MaterialModule {
}
