import { Component, OnInit, HostBinding } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';
import { HotelService } from '../../service/hotel.service';
import { DelayLeaveAnimation } from '../../shared/animations/delay-leave.animation';

import { HotelModel } from '../../model/hotel.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.styl'],
  animations: [DelayLeaveAnimation]
})
export class IndexComponent implements OnInit {

  topHotelTitle: string;
  topHotelImg: string;
  topHotelScore: string;
  hotelList: HotelModel[] = [];

  // @HostBinding('@delayLeaveAnimation') delayLeaveAnimation = true;
  constructor(private navigateService: NavigateService,
              private hotelService: HotelService) { }

  ngOnInit() {
    this.hotelService.getHotelList('', 1).subscribe( res => {
      this.hotelList = res.json();
      this.topHotelTitle = (res.json())[0].hotel_name;
      this.topHotelImg = (res.json())[0].pic;
      this.topHotelScore = (res.json())[0].score;
    });
  }

  goPage(url) {
    this.navigateService.push();
    this.navigateService.pushToRoute(url);
  }


}

