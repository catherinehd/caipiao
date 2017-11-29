import { Component, OnInit, HostBinding } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';
import { DelayLeaveAnimation } from '../../shared/animations/delay-leave.animation';

import { NewsService } from '../../service/news.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.styl']
})
export class IndexComponent implements OnInit {
   newsList: any[];

  constructor(private navigateService: NavigateService,
              private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getNewsList('最新').subscribe( res => {
      this.newsList = res.json();
      for (let i = 0 ; i < this.newsList.length; i++) {
        this.newsList[i].path = this.newsList[i].path.replace(/\//g, '\\');
      }
    });
  }

  goPage(url) {
    this.navigateService.push();
    this.navigateService.pushToRoute(url);
  }

}
