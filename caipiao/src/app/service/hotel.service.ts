import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class HotelService {

  constructor(private httpService: HttpService) {
  }

  getHotelList(key, page) {
    return this.httpService.getMethod({
      url: 'Critique/GetHotels',
      data: {
        keyword: key,
        page: page,
      }
    });
  }

  getHotelDedail(id) {
    return this.httpService.getMethod({
      url: 'Critique/GetHotelInfo',
      data: {
        id: id,
      }
    });
  }

  getHotelComment(id, page) {
    return this.httpService.getMethod({
      url: 'Critique/GetHotelCommments',
      data: {
        id: id,
        page: page
      }
    });
  }

  write(mobile, category, comment) {
    return this.httpService.getMethod({
      url: 'Critique/Comment',
      data: {
        mobile: mobile,
        category: category,
        comment: comment,
      }
    });
  }
}
