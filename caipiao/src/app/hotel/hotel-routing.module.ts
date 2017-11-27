import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';

const hotelRoutes: Routes = [
  { path: 'hotel', component: IndexComponent },
  { path: 'hotel-detail/:id', component: HotelDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(hotelRoutes)],
  exports: [RouterModule],
})

export class HotelRoutingModule {}
