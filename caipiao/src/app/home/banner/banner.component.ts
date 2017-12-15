import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeStoreService } from '../../service/home-store.service';
import { BannerModel } from '../../model/banner.model';
import { ThemableBrowserService } from '../../service/themeable-browser.service';
import { UserStoreService } from '../../service/user-store.service';
import { NavigateService } from '../../service/navigate.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.styl']
})
export class BannerComponent implements OnInit, OnDestroy {
  bannerList: BannerModel[] = [];
  swiper: any;
  constructor(private homeStoreService: HomeStoreService,
              private navigateService: NavigateService,
              private themableBrowserService: ThemableBrowserService,
              private userStoreService: UserStoreService ) { }

  ngOnInit() {
    // this.homeStoreService.getBanners().subscribe(banners => {
    //   this.bannerList = banners;
    //   setTimeout(() => this.initSwiper(), 0)
    // })
    this.bannerList = [
                       {id: 1, imgUrl: 'assets/image/banner1.png' , targetUrl: '' },
                       {id: 2, imgUrl: 'assets/image/banner2.png' , targetUrl: '' },
                       {id: 3, imgUrl: 'assets/image/banner3.png' , targetUrl: '' },
                       ];
    setTimeout(() => this.initSwiper(), 0);
  }

  ngOnDestroy() {
    if (this.swiper) this.swiper.destroy();
  }

  initSwiper() {
    const base = this;
    this.swiper = new Swiper('.swiper-container', {
      autoplay: (base.bannerList.length > 1) ? 3000 : 0,
      loop: true,
      pagination: '.swiper-pagination'
    });
  }

  selectBanner(e) {
    const target = e.target;
    if (target && target.dataset) {
      const url = target.dataset.url;
      if (url) this.goPage(url);
    }
  }

  goPage(url) {
    if (this.userStoreService.getUser()) {
      if (url.includes('http')) {
        this.themableBrowserService.openOutLinksInApp(url)
      } else {
        this.navigateService.push();
        this.navigateService.pushToRoute(url);
      }
    } else {
      this.navigateService.push();
      this.navigateService.pushToRoute('/login');
    }
  }
}
