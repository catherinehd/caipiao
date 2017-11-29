import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../service/news.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.styl']
})
export class NewsDetailComponent implements OnInit {
  title: string;
  from: string;
  date: string;
  content: string;
  // @HostBinding('@slideToRightAnimation') slideToRightAnimation = true;
  path: string;

  constructor(private activatedRoute: ActivatedRoute,
              private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getNewsDedail(this.activatedRoute.snapshot.params.path.replace(/\\/g, '\/')).subscribe( res => {
      this.setNews(res);
    })
  }

  setNews(data) {
    const a = data.json().replace(/'/g , '"');
    this.title = (eval ('(' + a + ')')).title;
    this.from = (eval ('(' + a + ')')).subInfo.source;
    this.date = (eval ('(' + a + ')')).subInfo.time.substr(0,10) + ' ' + (eval ('(' + a + ')')).subInfo.time.substr(10);
    this.content = this.htmlDecode((eval ('(' + a + ')')).content);
    document.getElementById('content').innerHTML = this.content.replace(/imgsrc/g,'img src');
  }

  // 符号转义
  htmlEncode(html) {
    let temp = document.createElement('div');
    (temp.textContent != null) ? (temp.textContent = html) : (temp.innerHTML = html);
    const output = temp.innerHTML;
    temp = null;
    return output;
  }
  // 符号反转义
  htmlDecode(text) {
    let temp = document.createElement('div');
    temp.innerHTML = text;
    const output = temp.innerText || temp.textContent;
    temp = null;
    return output;
  }

}
