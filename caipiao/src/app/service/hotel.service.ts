import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class HotelService {

  constructor(private httpService: HttpService) { }

  getHotelList(key, page) {
    return this.httpService.getMethod({
      url: 'LotteryV2/GetHotels',
      data: {
        keyword: key,
        page: page,
      }
    });
  }

  getHotelDedail(id) {
    return this.httpService.getMethod( {
      url: 'LotteryV2/GetHotelInfo',
      data: {
        id: id,
      }
    });
  }

  getHotelComment(id, page) {
    return this.httpService.getMethod( {
      url: 'LotteryV2/GetHotelCommments',
      data: {
        id: id,
        page: page
      }
    });
  }
}
