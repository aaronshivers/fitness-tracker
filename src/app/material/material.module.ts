import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSortModule, MatTableModule,
  MatTabsModule,
} from '@angular/material';

const MaterialComponents = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSortModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatTabsModule,
];

@NgModule({
  imports: [ MaterialComponents ],
  exports: [ MaterialComponents ],
})
export class MaterialModule {
}
