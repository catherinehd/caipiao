import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { InputDianpingComponent } from './input-dianping/input-dianping.component';

const dianpingRoutes: Routes = [
  { path: 'dianping', component: IndexComponent },
  { path: 'input-dianping/:id', component: InputDianpingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(dianpingRoutes)],
  exports: [RouterModule],
})

export class DianpingRoutingModule {}
