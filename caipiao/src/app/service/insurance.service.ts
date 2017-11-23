import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class InsuranceService {

  constructor(private httpService: HttpService) { }

  getInsuranceList(pageIndex, pageSize = 20) {
    return this.httpService.getMethod({
      url: 'Insus/GetList',
      data: {
        title: '',
        page_size: pageSize,
        page_index: pageIndex,
        order: 'visit_times desc'
      }
    })
  }

}
