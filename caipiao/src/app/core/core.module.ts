import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavigateService } from '../service/navigate.service';
import { HttpService } from '../service/http.service';
import { DeviceService } from '../service/device.service';
import { UserStoreService } from '../service/user-store.service';
import { ThemableBrowserService } from '../service/themeable-browser.service';
import { ServicefalseService } from '../service/servicefalse.service';

@NgModule({
  imports: [ HttpModule, BrowserAnimationsModule ],
  providers: [ NavigateService, HttpService, DeviceService,  UserStoreService, ThemableBrowserService , ServicefalseService],
  exports: [ HttpModule, BrowserAnimationsModule ]
})

export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only')
    }
  }
}
