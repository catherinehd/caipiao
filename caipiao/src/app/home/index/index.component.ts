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

import { HotelService } from '../../service/hotel.service';
import { HotelModel} from '../../model/hotel.model';
import { MovieService} from '../../service/movie.service';
import { NewsService } from '../../service/news.service';

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

  hotelList: HotelModel[] = [];
  movieList: any[];
  topNews: any;
  title: string;

  constructor(private navigateService: NavigateService,
              private homeStoreService: HomeStoreService,
              private themableBrowserService: ThemableBrowserService,
              private userStoreService: UserStoreService,
              private hotelService: HotelService,
              private newsService: NewsService,
              private movieService: MovieService) { }

  ngOnInit() {
    // this.navigateService.clearRouteList();
    // this.getLoanList();
    // this.getInsuranceList();
  this.newsService.getNewsList('最新').subscribe( res => {
    this.topNews = res.json()[0];
      this.topNews.path = this.topNews.path.replace(/\//g, '\\');
      this.title = res.json()[0].title;
  });
   this.hotelService.getHotelList('', 1).subscribe( res => {
     this.hotelList = (res.json().slice(0 , 5));
   });
   this.movieService.getMovieList('', 1).subscribe( res => {
     this.movieList = (res.json().slice(0 , 5));
   });
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
