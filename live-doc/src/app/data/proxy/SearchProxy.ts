import * as Promise from 'bluebird';
import {AbstractProxy} from "./AbstractProxy";
import {Injectable} from "@angular/core";

@Injectable()
export class SearchProxy extends AbstractProxy {

    public getSomeData(): Promise.Thenable<any> {
        return this.get<any, any>('some/path');
    }

}
