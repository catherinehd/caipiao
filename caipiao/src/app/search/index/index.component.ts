import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigateService } from '../../service/navigate.service';
import { HotelService } from '../../service/hotel.service';
import { MovieService} from '../../service/movie.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.styl', '../../movie/index/index.component.styl', '../../hotel/index/index.component.styl']
})
export class IndexComponent implements OnInit {
  searchforword: string;
  movieList: any[];
  hotelList: any[];
  modal = {
    isConfirmModalShow: false,
    confirmMsg: '您确定要清空历史吗？'
  };
  nocontent = true;
  cache: string[];
  constructor(private activatedRoute: ActivatedRoute,
              private navigateService: NavigateService,
              private movieService: MovieService,
              private hotelService: HotelService) { }

  ngOnInit() {
    this.searchforword = this.activatedRoute.snapshot.params.keyword;
    this.cache = [];
    this.cache.push(this.searchforword);
    if (this.cache.length > 5) {
      console.log(this.cache);
       this.cache = this.cache.slice(0 , 5);
    }
    this.movieService.getMovieList( this.activatedRoute.snapshot.params.keyword, 0).subscribe( res => {
      this.movieList = res.json();
      this.hotelService.getHotelList(this.activatedRoute.snapshot.params.keyword, 0).subscribe( res => {
        this.hotelList = res.json();
        if (this.movieList.length === 0 && this.hotelList.length === 0) {
          this.nocontent = true;
        } else {
          this.nocontent = false;
        }
      });
    });
  }

  confirm(status) {
    if (status) {
      // this.logout();
    }
    this.modal.isConfirmModalShow = false;
  }

  goPage(url) {
    this.navigateService.push();
    this.navigateService.pushToRoute(url);
  }

  navSearch() {
    if(!this.searchforword) return;
    this.cache.push(this.searchforword);
    if (this.cache.length > 5) {
      this.cache = this.cache.slice(0 , 5);
    }
    this.navigateService.push();
    this.navigateService.pushToRoute('./search/' + this.searchforword);
    this.movieService.getMovieList( this.searchforword, 0).subscribe( res1 => {
      this.movieList = res1.json();
      this.hotelService.getHotelList( this.searchforword, 0).subscribe( res2 => {
        this.hotelList = res2.json();
        if (this.movieList.length === 0 && this.hotelList.length === 0) {
          this.nocontent = true;
        } else {
          this.nocontent = false;
        }
      });
    });
  }
}

