import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ServicefalseService } from './servicefalse.service';
import { DeviceService } from './device.service';

@Injectable()
export class NavigateService {

  routeList: string[] = [];
  nextRoute = '/';     // 登录成功跳转到原本应该去的页面， app里打开外边页面存的是当前页面地址，好跳回来
  falsenextRoute = '/homefalse';
  isBack: boolean;

  constructor(private router: Router,
               private deviceService: DeviceService) { }

  clearRouteList() {
    this.routeList = [];
  }

  push(route: string = this.router.url) {
    this.routeList.push(route);
  }

  popRoute() {
    this.isBack = true;
    if (this.routeList.length > 0) {
      const lastRoute = this.routeList.pop();
      this.router.navigate([lastRoute]);
    } else {
      if ( this.deviceService.falsepage === true ) {
        this.router.navigate(['/homefalse']);
      } else {
        this.router.navigate(['/home']);
      }
    }
  }

  pushToRoute(route: string, param?: any) {
    this.isBack = false;
    if (!param) {
      this.router.navigate([route]);
    }else {
      this.router.navigate([route, param]);
    }
  }

  pushToNextRoute() {
    this.router.navigate([this.nextRoute]);
  }

  falsePushToNextRoute() {
    this.router.navigate([this.falsenextRoute]);
  }

  storeNextRoute(route?: string) {
    this.nextRoute = route ? route : this.router.url;
  }
}
