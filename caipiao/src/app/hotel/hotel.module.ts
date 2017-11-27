import { NgModule } from '@angular/core';

import { HotelRoutingModule } from './hotel-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';



@NgModule({
  imports: [ HotelRoutingModule, SharedModule ],
  declarations: [
    IndexComponent,
    HotelDetailComponent
  ],
  // providers: [ UserService ]
})
export class HotelModule { }
