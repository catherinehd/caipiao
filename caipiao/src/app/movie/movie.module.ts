import { NgModule } from '@angular/core';

import { MovieRoutingModule } from './movie-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [ MovieRoutingModule, SharedModule ],
  declarations: [
    IndexComponent
  ],
  // providers: [ UserService ]
})
export class MovieModule { }
