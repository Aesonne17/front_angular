import {EventEmitter, Injectable} from '@angular/core';
import {SearchAction} from './actions/SearchAction';

@Injectable()
export class Dispatcher {
    searchAction = new EventEmitter<SearchAction>(false);
}
