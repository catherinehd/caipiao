import { NgModule } from '@angular/core';

import { DianpingRoutingModule } from './dianping-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { InputDianpingComponent } from './input-dianping/input-dianping.component';



@NgModule({
  imports: [ DianpingRoutingModule, SharedModule ],
  declarations: [
    IndexComponent,
    InputDianpingComponent,
  ],
  // providers: [ UserService ]
})
export class DianpingModule { }
