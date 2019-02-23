import {EventEmitter, Inject, Injectable,} from '@angular/core';
import {AppState} from '../AppState';
import {Dispatcher} from '../dispatcher';


type ActionToEmitT<T> = [Action<T>, EventEmitter<Action<T>>];
type ActionToEmit = ActionToEmitT<any>;
type SimpleActionToEmit<T> = [T, EventEmitter<T>];

/**
 * The base class for all actions.
 * Inside an action class the app state should not be changed.
 */
export abstract class Action<TArgs> {
    protected actionsToEmit: ActionToEmit[] = [];
    protected simpleActionsToEmit: SimpleActionToEmit<any>[] = [];

    /**
     * Any other injected services could be added to the constructor.
     * The constructor signature should match to the IActionConstructor interface.
     */
    constructor(
        protected dispatcher: Dispatcher,
        protected appState: AppState
    ) {
    }

    /**
     * Here in the child class you should start all asynchronous requests if necessary.
     * In the requests' callbacks you could emit another actions asynchronously.
     */
    abstract startAsyncChain(args: TArgs);

    /**
     * @returns {AppState} Read only application state, do not modify it.
     */
    getState(): AppState {
        return this.appState;
    }

    emitActionsChain() {
        /**
         * All actions have been already created therefore all async processes have been started depending on
         * the not modified app state.
         * Here this actions are emitted. That leads to modifying the app state.
         */
        this.actionsToEmit.forEach((actionToEmit: ActionToEmit) => {
            let action: Action<void>;
            let emitter: EventEmitter<Action<any>>;
            [action, emitter] = actionToEmit;
            emitter.emit(action);
            action.emitActionsChain();
        });

        /**
         * Emit actions which are not instances of the Action class
         */
        this.simpleActionsToEmit.forEach((actionToEmit: SimpleActionToEmit<any>) => {
            let payload: any;
            let emitter: EventEmitter<any>;
            [payload, emitter] = actionToEmit;
            emitter.emit(payload);
        });
    }
}

interface IActionConstructor<TArgs, TAction extends Action<TArgs>> {
    new(
        dispatcher: Dispatcher,
        appState: AppState,
    ): TAction;
}

@Injectable()
export class ActionFactory {
    constructor(
        @Inject(Dispatcher) protected dispatcher: Dispatcher,
        @Inject(AppState) protected appState: AppState,
    ) {
    }

    createAction<TAction extends Action<TArgs>, TArgs>(ctor: IActionConstructor<TArgs, TAction>, args: TArgs): TAction {
        const instance: TAction = new ctor(
            this.dispatcher,
            this.appState,
        );
        instance.startAsyncChain(args);
        instance.emitActionsChain();
        return instance;
    }
}
