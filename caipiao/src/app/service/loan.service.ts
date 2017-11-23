import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class LoanService {
  constructor(private httpService: HttpService) { }

  // typeId ''全额 1小额 2大额 3车贷
  // debt 金额 /元
  // time 时间 /月
  getLoansList(typeId, pageSize, pageIndex, debt = '', time = '', ) {
    return this.httpService.getMethod({
      url: 'Loans/GetList',
      data: {
        title: '',
        type_id: typeId,
        debt: debt,
        time: time,
        page_size: pageSize,
        page_index: pageIndex,
        order: 'visit_times desc'
      }
    });
  }

  // 获取银行服务
  getBankList() {
    return this.httpService.getMethod({
      url: 'BankSev/GetList'
    });
  }


}
