import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';

const movieRoutes: Routes = [
  { path: 'movie', component: IndexComponent },
];

@NgModule({
  imports: [RouterModule.forChild(movieRoutes)],
  exports: [RouterModule],
})

export class MovieRoutingModule {}
