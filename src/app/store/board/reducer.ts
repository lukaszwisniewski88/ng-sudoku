import { createReducer, on, Action } from '@ngrx/store';
import { produce } from 'immer'
import { indexToCoords, indexTosquare } from '../../common/utils'
import { select } from './actions'
import { Field, Fields, FieldState, Coordinates } from './field.interface'

const BOARD_SIZE = 9

const createInitialState = (): FieldState => {
    let boardArray = [...Array(Math.pow(BOARD_SIZE, 2)).keys()]
    let entities: Fields = []
    boardArray.forEach((_value, index) => {
        entities[index.toString()] = { ...createEmptyField(index) }
    })
    return {
        ids: boardArray,
        entities: entities
    }
}
const createEmptyField = (index): Field => {
    return {
        coordinates: indexToCoords(index),
        value: null,
        selected: false,
        fixed: false,
        valid: true
    }

}

const reducer = createReducer(createInitialState(),
    on(select, (state, { index }) => {
        //unselect all 
        const nextState = produce(state, draft => {
            state.ids.forEach(id => {
                if (state.entities[id].selected) {
                    draft.entities[id].selected = false
                }
            })
            //toggle
            if (state.entities[index].selected) {
                draft.entities[index].selected = false
            } else draft.entities[index].selected = true
        })
        return nextState
    }),

)

export function boardReducer(state: FieldState, action: Action) {
    return reducer(state, action)
}