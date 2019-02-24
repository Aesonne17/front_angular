import {Action} from './Action';

export class SearchAction extends Action<void> {

    startAsyncChain(): void {
        this.searchProxy.getSomeData()
            .then(() => {
                debugger;
            }, () => {
                debugger;
            });
    }

}
