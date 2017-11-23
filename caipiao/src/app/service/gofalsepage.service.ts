import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { NavigateService } from '../service/navigate.service';
import { ServicefalseService } from './servicefalse.service';
import { DeviceService } from './device.service';
import { Http, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';

@Injectable()
export class Gofalsepage implements CanActivate, CanActivateChild {
  constructor(private navigateService: NavigateService,
              private http: Http,
              private servicefalseService: ServicefalseService,
              private deviceService: DeviceService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin() {
    if (this.deviceService.falsepage) {
      this.deviceService.gofalsepage();
      return true;
    } else {
      this.navigateService.pushToRoute('./home');
      return false;
    }
  }
}
