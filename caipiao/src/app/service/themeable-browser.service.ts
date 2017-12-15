import { Injectable } from '@angular/core';
import { DeviceConfig } from '../config/config';
import { DeviceService } from '../service/device.service';

@Injectable()
export class ThemableBrowserService {
  options: any;
  constructor (private deviceService: DeviceService) {
    this.options = {
      statusbar: {
        color: '#1db6f6',
      },
      toolbar: {
        height: 44,
        color: '#1db6f6'
        // wwwImage: 'assets/image/toolbar.png',
        // wwwImageDensity: 2,
      },
      title: {
        color: '#ffffffff',
        showPageTitle: true
      },
      backButton: {
        wwwImage: 'assets/image/back.png',
        wwwImagePressed: 'assets/image/back.png',
        wwwImageDensity: 2,
        align: 'left',
        event: 'backPressed'
      },
      forwardButton: {
        event: 'forwardPress'
      },
      closeButton: {
        wwwImage: 'assets/image/close.png',
        wwwImagePressed: 'assets/image/close.png',
        wwwImageDensity: 2,
        align: 'right',
        event: 'closePressed'
      },
      backButtonCanClose: true
    };
  }

  openOutLinksInApp(url) {
    if ( !this.deviceService.isApp ) {
      window.open(url);
      return;
    }
    try {
      cordova.ThemeableBrowser.open(url, '_blank', this.options)
        .addEventListener('backPressed', (event) => {
          console.log('ThemeableBrowser backpress------', event);
        }, false)
        .addEventListener(cordova.ThemeableBrowser.EVT_ERR, (msg) => {
          console.log('ThemeableBrowser err-------', msg);
        }, false)
        .addEventListener(cordova.ThemeableBrowser.EVT_WRN, (msg) => {
          console.log('ThemeableBrowser warn-------', msg);
        }, false);
    }catch (err) {
      console.log('ThemeableBrowser catch err------', err);
      window.open(url);
    }
  }
}
