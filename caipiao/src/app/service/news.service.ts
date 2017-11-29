import { Injectable } from '@angular/core';
import { HttpService } from './http.service';


@Injectable()
export class NewsService {

  constructor(private httpService: HttpService) { }

  getNewsList(key , page) {
    return this.httpService.getMethod({
      url: 'LotteryV2/News',
      data: {
        keyword: key,
        page: page,
      }
    });
  }

  getNewsDedail(path) {
    return this.httpService.getMethod( {
      url: 'LotteryV2/NewsInfo',
      data: {
        path: path,
      }
    });
  }

}
