import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';

const hotelRoutes: Routes = [
  { path: 'hotel', component: IndexComponent },
];

@NgModule({
  imports: [RouterModule.forChild(hotelRoutes)],
  exports: [RouterModule],
})

export class HotelRoutingModule {}
