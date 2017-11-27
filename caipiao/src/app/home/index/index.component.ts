import { Component, OnInit, HostBinding } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';
import { HomeStoreService } from '../../service/home-store.service';
import { ThemableBrowserService } from '../../service/themeable-browser.service';
import { LoanModel } from '../../model/loan.model';
import { InsuranceModel } from '../../model/insurance.model';
import { UserStoreService } from '../../service/user-store.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { DelayLeaveAnimation } from '../../shared/animations/delay-leave.animation';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.styl'],
  animations: [DelayLeaveAnimation]
})

export class IndexComponent implements OnInit {
  loanList: LoanModel[] = [];
  insuranceList: InsuranceModel[] = [];
  isRefreshed = false;
  @HostBinding('@delayLeaveAnimation') delayLeaveAnimation = true;
  @HostBinding('class.page') page = true;

  constructor(private navigateService: NavigateService,
              private homeStoreService: HomeStoreService,
              private themableBrowserService: ThemableBrowserService,
              private userStoreService: UserStoreService ) { }

  ngOnInit() {
    // this.navigateService.clearRouteList();
    // this.getLoanList();
    // this.getInsuranceList();
  }

  goPage(url) {
    this.navigateService.push();
    this.navigateService.pushToRoute(url);
  }

  // openLinks(url) {
  //   if (this.userStoreService.getUser()) {
  //     this.themableBrowserService.openOutLinksInApp(url);
  //   } else {
  //     this.navigateService.push();
  //     this.navigateService.pushToRoute('/login');
  //   }
  // }

  navSearch() {
    this.navigateService.push();
    this.navigateService.pushToRoute('./search');
  }

  refresh() {
   Observable.forkJoin(this.homeStoreService.refreshLoanList(), this.homeStoreService.refreshInsuranceList())
      .subscribe(res => {
        // this.loanList = res[0];
        // this.insuranceList = res[1];
        this.isRefreshed = true;
        setTimeout(() => this.isRefreshed = false, 0);
      })
  }
}
