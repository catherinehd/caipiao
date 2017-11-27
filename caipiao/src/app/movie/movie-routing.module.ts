import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

const movieRoutes: Routes = [
  { path: 'movie', component: IndexComponent },
  { path: 'movie-detail/:id', component: MovieDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(movieRoutes)],
  exports: [RouterModule],
})

export class MovieRoutingModule {}
