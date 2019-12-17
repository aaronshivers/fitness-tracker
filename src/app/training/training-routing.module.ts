import { NgModule } from '@angular/core';
import { TrainingComponent } from './training/training.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TrainingComponent,
  },
];


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TrainingRoutingModule {
}
