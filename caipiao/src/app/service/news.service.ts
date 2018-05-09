import { Injectable } from '@angular/core';
import { HttpService } from './http.service';


@Injectable()
export class NewsService {

  constructor(private httpService: HttpService) { }

  getNewsList(key , page) {
    return this.httpService.getMethod({
      url: 'Critique/News',
      data: {
        keyword: key,
        page: page,
      }
    });
  }

  getNewsDedail(path) {
    return this.httpService.getMethod( {
      url: 'Critique/NewsInfo',
      data: {
        path: path,
      }
    });
  }

}
