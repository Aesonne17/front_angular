import {Component, Inject} from '@angular/core';
import {ActionFactory} from './actions/Action';
import {AppState} from './AppState';
import {SearchController} from './controllers/SearchController';
import {Dispatcher} from './dispatcher';

@Component({
    selector: 'app',
    templateUrl: './app.html',
    styleUrls: ['./app.css']
})
export class App {
    title = 'live-doc';

    constructor(
        private actionFactory: ActionFactory,
        @Inject(Dispatcher) protected dispatcher: Dispatcher,
        @Inject(AppState) protected appState: AppState,
        @Inject(SearchController) protected searchController: SearchController
    ) {

    }
}
