import { Component, OnInit, HostBinding } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';
import { HomeStoreService } from '../../service/home-store.service';
import { ThemableBrowserService } from '../../service/themeable-browser.service';
import { LoanModel } from '../../model/loan.model';
import { HttpService} from '../../service/http.service';
import { InsuranceModel } from '../../model/insurance.model';
import { UserStoreService } from '../../service/user-store.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { DelayLeaveAnimation } from '../../shared/animations/delay-leave.animation';

import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
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
  ad: any;

  searchForm: FormGroup;
  searchword: string;
  searchfor: Seachfor = new Seachfor('');

  constructor(private navigateService: NavigateService,
              private homeStoreService: HomeStoreService,
              private httpService: HttpService,
              private themableBrowserService: ThemableBrowserService,
              private userStoreService: UserStoreService,
              private formBuilder: FormBuilder,
              private hotelService: HotelService,
              private newsService: NewsService,
              private movieService: MovieService) { }

  ngOnInit() {
    this.navigateService.clearRouteList();
    this.newsService.getNewsList('最新' , 0).subscribe( res => {
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
   this.buildForm();
  }

  buildForm() {
    this.searchForm = this.formBuilder.group( {
      'searchword': [this.searchfor.searchword, [
      ]]
    });
  }
  goPage(url) {
    this.navigateService.push();
    this.navigateService.pushToRoute(url);

    // this.httpService.getMethod( {
    //     fullUrl: 'http://tease.fancelue.com/LotteryV2/GetFree'
    //   }
    // ).subscribe( res => {
    //   cordova.InAppBrowser.open(res.json(), '_blank', '', function(){console.log('open-test'); });
    // });
  }

  // openLinks(url) {
  //   if (this.userStoreService.getUser()) {
  //     this.themableBrowserService.openOutLinksInApp(url);
  //   } else {
  //     this.navigateService.push();
  //     this.navigateService.pushToRoute('/login');
  //   }
  // }

  navSearch(msg) {
    if(!msg) return;
    this.navigateService.push();
    this.navigateService.pushToRoute('./search/' + msg);
  }

  refresh() {
   Observable.forkJoin(this.homeStoreService.refreshLoanList(), this.homeStoreService.refreshInsuranceList())
      .subscribe(res => {
        // this.loanList = res[0];
        // this.insuranceList = res[1];
        this.isRefreshed = true;
        setTimeout(() => this.isRefreshed = false, 0);
      });
  }
}

class Seachfor {
  constructor(public searchword: string) {}
}
