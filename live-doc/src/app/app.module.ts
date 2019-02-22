import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { App } from './app';
import { TopToolbar } from './components/TopToolbar/TopToolbar';
import { SearchResultList } from './components/SearchResultList/SearchResultList';
import { Dispatcher } from './dispatcher';
import { AppState } from './AppState';

@NgModule({
  declarations: [
    App,
    TopToolbar,
    SearchResultList
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    AppState,
    Dispatcher
  ],
  bootstrap: [App]
})
export class AppModule { }
