import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';
import { HotelService } from '../../service/hotel.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.styl']
})
export class HotelDetailComponent implements OnInit {

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

  constructor(private navigateService: NavigateService,
              private activatedRoute: ActivatedRoute,
              private hotelService: HotelService) { }

  ngOnInit() {
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
    this.qiandao = true;
    setTimeout(() => {
      this.qiandao = false;
    }, 2000);
  }

  write() {
    this.ping = true;
  }

  submit() {
    this.hotelService.write('mobile', 'hotel', 'comment').subscribe( res => {
      console.log(res);
    });
  }

  showTip(msg, callback ?: any) {
    this.tip = msg;
    setTimeout(() => {
      this.tip = '';
      if (callback) callback();
    }, 3000);
  }

}
