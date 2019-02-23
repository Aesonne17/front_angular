import {Injectable} from '@angular/core';
import {AppState} from '../AppState';
import {Dispatcher} from '../dispatcher';

@Injectable()
export class SearchController {

    constructor(
        private dispatcher: Dispatcher,
        private appState: AppState
    ) {
        this.dispatcher.searchAction.subscribe(() => {
        });
    }

}
