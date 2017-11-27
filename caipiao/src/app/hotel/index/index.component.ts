import { Component, OnInit, HostBinding } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';
import { DelayLeaveAnimation } from '../../shared/animations/delay-leave.animation';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.styl'],
  animations: [DelayLeaveAnimation]
})
export class IndexComponent implements OnInit {

  // @HostBinding('@delayLeaveAnimation') delayLeaveAnimation = true;
  constructor(private navigateService: NavigateService) { }

  ngOnInit() {
  }

  goPage(url) {
    this.navigateService.push();
    this.navigateService.pushToRoute(url);
  }


}
