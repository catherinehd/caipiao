import { NgModule } from '@angular/core';

import { NewsRoutingModule } from './news-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { NewsDetailComponent } from './news-detail/news-detail.component';



@NgModule({
  imports: [ NewsRoutingModule, SharedModule ],
  declarations: [
    IndexComponent,
    NewsDetailComponent
  ],
  // providers: [ UserService ]
})
export class NewsModule { }
