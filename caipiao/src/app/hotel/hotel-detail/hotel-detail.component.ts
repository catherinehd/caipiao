import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';
import { HotelService } from '../../service/hotel.service';
import { ActivatedRoute } from '@angular/router';
import { UserStoreService } from '../../service/user-store.service';


@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.styl']
})
export class HotelDetailComponent implements OnInit {
  mobile: string;
  commentList: any[];
  topImg: string;
  address: string;
  hotelName: string;
  start: string;
  decoration: string;
  setin: string;
  leave: string;
  roomnum: number;
  tip: string;
  qiandao = false;
  ping = false;
  msg: string;
  dianpingtext: string;

  constructor(private navigateService: NavigateService,
              private activatedRoute: ActivatedRoute,
              private userStoreService: UserStoreService,
              private hotelService: HotelService) {
    this.dianpingtext = '';
  }

  ngOnInit() {
    const user = this.userStoreService.getUser();
    this.mobile = user ? user.mobile : '';
    this.hotelService.getHotelDedail( this.activatedRoute.snapshot.params.id ).subscribe( res => {
      this.topImg = res.json().pic;
      this.address = res.json().address;
      this.hotelName = res.json().hotel_name;
      this.start = res.json().openYear.slice(6 , 10);
      this.leave = res.json().outTime;
      this.decoration = res.json().redecYear.slice(6 , 10);
      this.setin = res.json().inTime;
      this.roomnum = res.json().rooms;
      this.tip = res.json().preFee;
    })
    this.hotelService.getHotelComment( this.activatedRoute.snapshot.params.id , 1).subscribe( res => {
      this.commentList = res.json();
    });
  }

  qian() {
    if (!this.mobile) {
      this.navigateService.pushToRoute('./login');
    }
    this.qiandao = true;
    setTimeout(() => {
      this.qiandao = false;
    }, 2000);
  }

  write() {
    if (!this.mobile) {
      this.navigateService.pushToRoute('./login');
    }
    this.ping = true;
  }

  submit() {
    this.hotelService.write(this.mobile, 'movie', this.dianpingtext).subscribe( res => {
      if(res.ok) {
        this.showTip('恭喜点评成功！请等待审核');
        this.dianpingtext = '';
        this.ping = false;
      } else {
        this.showTip('因为什么原因，点评失败了呢');
        this.ping = false;
      }
    });
  }

  showTip(msg, callback ?: any) {
    this.msg = msg;
    setTimeout(() => {
      this.msg = '';
      if (callback) callback();
    }, 3000);
  }

}
