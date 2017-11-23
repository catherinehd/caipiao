import { NgModule } from '@angular/core';

import { NewsRoutingModule } from './news-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [ NewsRoutingModule, SharedModule ],
  declarations: [
    IndexComponent
  ],
  // providers: [ UserService ]
})
export class NewsModule { }
