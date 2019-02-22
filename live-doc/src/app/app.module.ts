import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ActionFactory} from './actions/Action';
import {App} from './app';

import {AppRoutingModule} from './app-routing.module';
import {AppState} from './AppState';
import {SearchResultList} from './components/SearchResultList/SearchResultList';
import {TopToolbar} from './components/TopToolbar/TopToolbar';
import {Dispatcher} from './dispatcher';

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
        ActionFactory,
        AppState,
        Dispatcher
    ],
    bootstrap: [App]
})
export class AppModule {
}
