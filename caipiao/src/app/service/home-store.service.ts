import { Injectable } from '@angular/core';
import { LoanModel } from '../model/loan.model';
import { InsuranceModel } from '../model/insurance.model';
import { HomeService } from './home.service';
import { BannerModel } from '../model/banner.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class HomeStoreService {
  bannerList: BannerModel[];
  loanList: LoanModel[];
  insuranceList: InsuranceModel[];

  constructor(private homeService: HomeService) { }

  getBannerList() {
    return this.homeService.getBanners().map(res => {
     const response = res.json();
     this.bannerList = [];
     if (response && response.length) {
       response.forEach(value => {
         this.bannerList.push(new BannerModel(value));
       })
     }
     return this.bannerList;
    })
  }

  refreshLoanList() {
    return this.homeService.getLoansList().map(res => {
      this.loanList = [];
      const response = res.json();
      if (response && response[0]) {
        response.forEach(value => {
          this.loanList.push(new LoanModel(value));
        });
        return this.loanList;
      }
    });
  }

  refreshInsuranceList() {
      return this.homeService.getInsuranceList().map(res => {
        this.insuranceList = [];
        const response = res.json();
        if (response && response[0]) {
          response.forEach(value => {
            this.insuranceList.push(new InsuranceModel(value));
          });
        }
        return this.insuranceList;
      });
  }

  getLoanList() {
    return this.loanList ? Observable.of(this.loanList) : this.refreshLoanList();
  }

  getInsuranceList() {
    return this.insuranceList ? Observable.of(this.insuranceList) : this.refreshInsuranceList();
  }

  getBanners() {
    return this.bannerList ? Observable.of(this.bannerList) : this.getBannerList();
  }
}

