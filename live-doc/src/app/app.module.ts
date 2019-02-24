import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ActionFactory} from './actions/Action';
import {App} from './app';

import {AppRoutingModule} from './app-routing.module';
import {AppState} from './AppState';
import {SearchResultList} from './components/SearchResultList/SearchResultList';
import {TopToolbar} from './components/TopToolbar/TopToolbar';
import {SearchController} from './controllers/SearchController';
import {Dispatcher} from './dispatcher';
import {HttpClientModule} from "@angular/common/http";
import {SearchProxy} from "./data/proxy/SearchProxy";

@NgModule({
    declarations: [
        App,
        TopToolbar,
        SearchResultList
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        ActionFactory,
        AppState,
        Dispatcher,
        SearchController,
        SearchProxy
    ],
    bootstrap: [App]
})
export class AppModule {
}
