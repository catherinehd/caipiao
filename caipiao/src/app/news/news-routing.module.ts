import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';

const newsRoutes: Routes = [
  { path: 'news', component: IndexComponent },
  { path: 'news-detail/:id', component: NewsDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(newsRoutes)],
  exports: [RouterModule],
})

export class NewsRoutingModule {}
