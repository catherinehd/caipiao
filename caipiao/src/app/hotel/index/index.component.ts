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

  isCompleted = false;
  isPageLoading = true;
  isLoading: boolean;
  pageIndex: number;

  // @HostBinding('@delayLeaveAnimation') delayLeaveAnimation = true;
  constructor(private navigateService: NavigateService,
              private hotelService: HotelService) {
    this.pageIndex = 0;
    this.hotelList = [];
  }

  ngOnInit() {
    this.hotelService.getHotelList('', 0).subscribe( res => {
      this.hotelList = res.json();
      this.topHotelTitle = (res.json())[0].hotel_name;
      this.topHotelImg = (res.json())[0].pic;
      this.topHotelScore = (res.json())[0].score;
    });
  }

  setNewsList(data) {
    this.isPageLoading = false;
    this.isLoading = false;
    if (data.json().length === 0) {
      this.isCompleted = true;
      alert('没有更多了');
    } else {
      this.isCompleted = false;
    }
    const that = this;
    this.hotelList = this.hotelList.concat(data.json());
  }

  goPage(url) {
    this.navigateService.push();
    this.navigateService.pushToRoute(url);
  }

  getList(pagenum) {
    this.hotelService.getHotelList( '' , this.pageIndex).subscribe(res => {
      this.setNewsList(res);
    });
  }

  canLoad() {
    console.log('a');
    this.isLoading = true;
    this.getList(this.pageIndex = this.pageIndex + 1);
  }


}

