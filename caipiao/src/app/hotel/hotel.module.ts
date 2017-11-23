import { NgModule } from '@angular/core';

import { HotelRoutingModule } from './hotel-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [ HotelRoutingModule, SharedModule ],
  declarations: [
    IndexComponent
  ],
  // providers: [ UserService ]
})
export class HotelModule { }
