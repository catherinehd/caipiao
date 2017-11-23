import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class HomeService {

  constructor(private httpService: HttpService) { }

  getBanners() {
    return this.httpService.getMethod({
      url: 'Banners/GetList'
    });
  }

  getLoansList() {
    return this.httpService.getMethod({
      url: 'Loans/GetList',
      data: {
        order: 'visit_times desc',
        title: '',
        type_id: '',
        debt: '',
        time: '',
        page_size: 5,
        page_index: 1
      }
    });
  }

  getInsuranceList() {
    return this.httpService.getMethod({
      url: 'Insus/GetList',
      data: {
        title: '',
        page_size: 5,
        page_index: 1,
        order: 'visit_times desc'
      }
    })
  }



}
