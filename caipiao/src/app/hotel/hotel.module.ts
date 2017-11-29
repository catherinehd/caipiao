import { NgModule } from '@angular/core';

import { HotelRoutingModule } from './hotel-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';

import { HotelService } from '../service/hotel.service';

@NgModule({
  imports: [ HotelRoutingModule, SharedModule ],
  declarations: [
    IndexComponent,
    HotelDetailComponent
  ],
   providers: [ HotelService ]
})
export class HotelModule { }
