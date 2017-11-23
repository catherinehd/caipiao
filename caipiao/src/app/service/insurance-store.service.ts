import { Injectable } from '@angular/core';
import { InsuranceModel } from '../model/insurance.model';

@Injectable()
export class InsuranceStoreService {
  insuranceList: InsuranceModel[] = [];
  isCompleted: boolean;
  pageIndex: number;
  constructor() { }

  store(list, isCompleted, pageIndex) {
    [this.insuranceList, this.isCompleted, this.pageIndex] = [list, isCompleted, pageIndex];
  }

  getList() {
    return [this.insuranceList, this.isCompleted, this.pageIndex];
  }


}
