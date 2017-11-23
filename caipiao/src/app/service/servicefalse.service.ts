import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class ServicefalseService {
  falsepage: boolean;
  newsCache: NewsCache = new NewsCache([]);
  constructor(private httpService: HttpService) { }

  getNewsList(page) {
    return this.httpService.getMethod({
      url: 'news/top',
      data: {
        offset: page,
      }
    });
  }
  getNewsdetail(path) {
    return this.httpService.getMethod({
      url: 'news/info',
      data: {
        path: path,
      }
    });
  }

  getFalsePage() {
    return this.httpService.getMethod( {
      fullUrl: 'https://www.91wcp.com/wcp9/PZB/Settings/IsDev?res=tease_jinrongchaoshi',
      data: {
        res: 'tease_jinrongchaoshi'
      }
    })
  }

  storeNewsList(list, iscompleted, pageIndex) {
    this.newsCache = new NewsCache(list, iscompleted, pageIndex);
  }
}

class NewsCache {
  constructor(public newsList: NewsModel[],
              public isCompleted?: boolean,
              public pageIndex?: number) {}
}


class NewsModel {
  constructor(public title: string,
              public from: string,
              public time: string) {}
}
