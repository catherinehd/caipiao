import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { SearchRoutingModule } from './search-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [ SearchRoutingModule, SharedModule, FormsModule ],
  declarations: [
    IndexComponent,
  ],
  // providers: [ UserService ]
})
export class SearchModule { }
