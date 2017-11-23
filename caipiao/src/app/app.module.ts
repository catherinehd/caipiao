import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { PersonModule } from './person/person.module';
import { HotelModule } from './hotel/hotel.module';
import { NewsModule } from './news/news.module';
import { MovieModule } from './movie/movie.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, CoreModule, BrowserAnimationsModule,
    PersonModule, HomeModule, HotelModule, NewsModule, MovieModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
