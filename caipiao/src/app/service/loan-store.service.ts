import { Injectable } from '@angular/core';
import { LoanService } from './loan.service';
import { BankModel } from '../model/bank.model';
import { LoanModel, CalcLoanModel } from '../model/loan.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class LoanStoreService {
  bankList: BankModel[];
  totalLoan: LoanCache = new LoanCache([]);
  largeLoan: LoanCache = new LoanCache([]);
  prettyLoan: LoanCache = new LoanCache([]);
  carLoan: LoanCache = new LoanCache([]);
  conditionsLoan: ConditionLoanCache = new ConditionLoanCache([], 3, 2);
  constructor(private loanService: LoanService) { }

  refreshBankList() {
    return this.loanService.getBankList().map(res => {
      this.bankList = [];
      const response = res.json();
      if (response && response[0]) {
        response.forEach(value => {
          this.bankList.push(new BankModel(value));
        })
      }
      return this.bankList;
    })
  }

  getBankList() {
    return this.bankList ? Observable.of(this.bankList) : this.refreshBankList();
  }

  getKey(type) {
    let key;
    switch (type) {
      case '1':
        key = 'prettyLoan';
        break;
      case '2':
        key = 'largeLoan';
        break;
      case '3':
        key = 'carLoan';
        break;
      default:
        key = 'totalLoan';
        break;
    }
    return key;
  }

  storeLoanList(type, list, isCompleted, pageIndex) {
    const key = this.getKey(type);
    this[key] = new LoanCache(list, isCompleted, pageIndex);
  }

  getLoanList(type) {
    const key = this.getKey(type);
    return this[key];
  }

  storeConditionLoanList(list, time, loan, isCompleted, pageIndex) {
    this.conditionsLoan = new ConditionLoanCache(list, time, loan, isCompleted, pageIndex)
  }

}

class LoanCache {
  constructor(public loanList: LoanModel[],
              public isCompleted?: boolean,
              public pageIndex?: number) {}
}

class ConditionLoanCache {   // loan----万
  constructor(public loanList: CalcLoanModel[],
              public time: number,
              public loan: number,
              public isCompleted?: boolean,
              public pageIndex?: number) {}
}

