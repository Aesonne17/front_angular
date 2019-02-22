import {Component} from '@angular/core';
import {ActionFactory} from '../../actions/Action';
import {SearchAction} from '../../actions/SearchAction';
import {Dispatcher} from '../../dispatcher';

@Component({
    selector: 'TopToolbar',
    templateUrl: './TopToolbar.html',
    styleUrls: ['./TopToolbar.css']
})
export class TopToolbar {
    constructor(
        private dispatcher: Dispatcher,
        private actionFactory: ActionFactory
    ) {
    }

    protected searchButtonClick(): void {
        this.dispatcher.searchAction.emit(
            this.actionFactory.createAction<SearchAction, void>(SearchAction, null)
        );
    }
}
