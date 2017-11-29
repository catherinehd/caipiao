import { Component, HostBinding } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';
import { UserStoreService } from '../../service/user-store.service';
import { DelayLeaveAnimation } from '../../shared/animations/delay-leave.animation';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.styl'],
  animations: [DelayLeaveAnimation]
})
export class IndexComponent {
  nickName: string;
  mobile: string;
  @HostBinding('@delayLeaveAnimation') delayLeaveAnimation = true;
  @HostBinding('class.page') page = true;
  constructor(private navigateSerivce: NavigateService, private userStoreService: UserStoreService) {
    const user = this.userStoreService.getUser();
    this.nickName = user ? user.nickName : '';
    this.mobile = user ? user.mobile : '';
    if(this.mobile) {
      this.mobile = this.mobile.substring(0, 3 ) + '****' + this.mobile.substring(7) ;
    } else {
      this.mobile = '' ;
    };
  }

  goPage(page) {
    this.navigateSerivce.push();
    this.navigateSerivce.pushToRoute(page);
  }

  pushToUserInfo() {
    if (!this.mobile) {
      this.goPage('./login');
    } else {
      this.goPage('/personal-info'); }
  }
}
