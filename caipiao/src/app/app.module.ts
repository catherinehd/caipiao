import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { PersonModule } from './person/person.module';
import { HotelModule } from './hotel/hotel.module';
import { NewsModule } from './news/news.module';
import { MovieModule } from './movie/movie.module';
import { SearchModule } from './search/search.module';
import { DianpingModule } from './dianping/dianping.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, CoreModule, BrowserAnimationsModule,
    PersonModule, HomeModule, HotelModule, NewsModule, MovieModule, SearchModule, DianpingModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
