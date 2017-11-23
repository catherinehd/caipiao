import { Injectable } from '@angular/core';
import { DeviceConfig } from '../config/config';
import { ServicefalseService } from './servicefalse.service';

@Injectable()
export class DeviceService {
  deviceReady: boolean;
  isApp: boolean;
  isIos: boolean;
  isAndroid: boolean;
  falsepage = false;

  constructor(private servicefalseService: ServicefalseService) {
    this.getDeviceName();
    this.gofalsepage();
  }

  getDeviceName() {
    try {
      if (cordova && cordova.platformId) {
        this.isApp = true;
        this.isAndroid = cordova.platformId === 'android';
        console.log('device---' + cordova.platformId);
        this.isIos = !this.isAndroid;
        this.deviceReady = true;
      } else {
        this.sameAsDeviceConfig();
      }
    }catch (e) {
      console.log('device-service-----', e);
      this.sameAsDeviceConfig();
      this.deviceReady = false;
    }
  }


  sameAsDeviceConfig() {
    this.isApp = DeviceConfig.isApp;
    this.isAndroid = DeviceConfig.isAndroid;
    this.isIos = DeviceConfig.isIos;
  }

  // 判断是否进入假页面
  gofalsepage() {
    this.servicefalseService.getFalsePage().subscribe( res => {
      return this.falsepage = res.json();
    })
  }
}
