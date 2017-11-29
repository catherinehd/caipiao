import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';

const searchRoutes: Routes = [
  { path: 'search/:keyword', component: IndexComponent },
];

@NgModule({
  imports: [RouterModule.forChild(searchRoutes)],
  exports: [RouterModule],
})

export class SearchRoutingModule {}
