import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.modul';
import { IndexComponent } from './index/index.component';
import { BannerComponent } from './banner/banner.component';
import { HomeService } from '../service/home.service';
import { HomeStoreService } from '../service/home-store.service';

@NgModule({
  imports: [ SharedModule, HomeRoutingModule, FormsModule ],
  declarations: [ IndexComponent, BannerComponent ],
  providers: [ HomeService, HomeStoreService ]
})
export class HomeModule { }
