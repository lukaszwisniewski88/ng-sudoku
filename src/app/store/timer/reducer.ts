import { createReducer, on, Action } from '@ngrx/store';
import { produce } from 'immer'

import { timePassed, reset } from './actions';

export const initialState = 0;

const _timerReducer = createReducer(initialState,
    on(reset, _state => 0),
    on(timePassed, state => produce(state, _draft => _draft = state + 1))

);

export function timerReducer(state: number, action: Action) {
    return _timerReducer(state, action);
}