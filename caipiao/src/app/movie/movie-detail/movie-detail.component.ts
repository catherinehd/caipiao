import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';
import { MovieService } from '../../service/movie.service';
import { ActivatedRoute } from '@angular/router';
import { UserStoreService } from '../../service/user-store.service';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.styl']
})
export class MovieDetailComponent implements OnInit {
  movieDetail: any;
  commentList: any[];
  mobile: string;
  ping: boolean;
  movieName: string;
  score: number;
  targets: string;
  times: string;
  upTime: string;
  profile: string;
  args: string;
  moviePic: string;
  msg: string;
  dianpingtext: string;

  constructor(private navigateService: NavigateService,
              private activatedRoute: ActivatedRoute,
              private userStoreService: UserStoreService,
              private movieService: MovieService) { }

  ngOnInit() {
    const user = this.userStoreService.getUser();
    this.mobile = user ? user.mobile : '';
    this.movieService.getMovieDedail( this.activatedRoute.snapshot.params.id ).subscribe( res => {
      this.movieName = res.json().movie_name;
      this.score = res.json().movie_score;
      this.targets = res.json().targets;
      this.times = res.json().times;
      this.upTime = res.json().upTime;
      this.profile = res.json().profile;
      this.args = res.json().comment_args;
      this.moviePic = res.json().movie_pic;

      this.movieService.getMovieComment( this.args ).subscribe( res => {
        this.commentList = res.json();
      });
    });
  }
  write() {
    if (!this.mobile) {
      this.navigateService.pushToRoute('./login');
    }
    this.ping = true;
  }

  submit() {
    this.movieService.write(this.mobile, 'movie', this.dianpingtext).subscribe( res => {
      if(res.ok) {
        this.showTip('恭喜点评成功！请等待审核');
        this.dianpingtext = '';
        this.ping = false;
      } else {
        this.showTip('因为什么原因，点评失败了呢');
        this.ping = false;
      }
    });
  }

  showTip(msg, callback ?: any) {
    this.msg = msg;
    setTimeout(() => {
      this.msg = '';
      if (callback) callback();
    }, 3000);
  }

}
