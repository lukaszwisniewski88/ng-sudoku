import { createReducer, on, Action } from '@ngrx/store';
import { produce } from 'immer'
import { select } from '../board/actions'

interface Selected {
    id: number | null
}
const reducer = createReducer({ id: null },
    on(select, (state, { index }) => {
        return produce(state, draft => {
            if (state.id === index) {
                draft.id = null
            } else draft.id = index
        })
    }))

export function actuallySelectedReducer(state: Selected, action: Action) {
    return reducer(state, action)
}