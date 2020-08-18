import { createReducer, on, Action } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { produce } from 'immer';
import { indexToCoords } from '../../common/utils';
import {
  fieldSelect,
  validatedInput,
  removeInvalid,
  createWebBoard,
  newGame,
} from './actions';
import { Field, FieldState, CoordsMapping } from './field.interface';

const BOARD_SIZE = 9;
const fieldAdapter: EntityAdapter<Field> = createEntityAdapter();
const createCoordsMap = (): CoordsMapping => {
  let Arr = new Array(Math.pow(BOARD_SIZE, 2)).fill(1);
  let entities = {};
  Arr.forEach((_element, index) => {
    let coords = indexToCoords(index);
    entities[`${coords.x},${coords.y}`] = index;
  });
  return entities;
};

const createEmptyField = (index): Field => {
  return {
    id: index,
    coordinates: indexToCoords(index),
    value: null,
    selected: false,
    fixed: false,
    valid: true,
    conflicts: [],
    conflicted: false,
  };
};

const reducer = createReducer(
  fieldAdapter.getInitialState({
    coordsMap: createCoordsMap(),
    loadingIndicator: false,
    fieldsToSolve: 81,
    actuallySelected: {
      coords: null,
      index: null,
    },
  }),
  on(newGame, (state) => {
    console.log('INIT');
    let array = new Array(Math.pow(BOARD_SIZE, 2)).fill(1);
    let fields = array.map((_element, index) => createEmptyField(index));
    const nextState = {
      ...fieldAdapter.addAll(fields, state),
      loadingIndicator: true,
    };
    return nextState;
  }),
  on(fieldSelect, (state, { index }) => {
    const nextState = produce(state, (draft) => {
      //unselect previous
      if (
        index !== state.actuallySelected.index &&
        state.actuallySelected.index !== null
      ) {
        draft.entities[state.actuallySelected.index].selected = false;
      }
      //toggle
      if (state.entities[index].selected) {
        draft.entities[index].selected = false;
        draft.actuallySelected = {
          coords: null,
          index: null,
        };
      } else {
        draft.entities[index].selected = true;
        draft.actuallySelected = {
          coords: indexToCoords(index),
          index,
        };
      }
    });
    return nextState;
  }),
  on(createWebBoard, (state, { squares }) => {
    let updates = squares.map(
      (square): Update<Field> => {
        let index = state.coordsMap[`${square.x},${square.y}`];
        return {
          id: index,
          changes: {
            value: square.value,
            fixed: true,
          },
        };
      }
    );
    const toSolveLeft = state.fieldsToSolve - updates.length;
    return {
      ...fieldAdapter.updateMany(updates, state),
      loadingIndicator: false,
      fieldsToSolve: toSolveLeft,
    };
  }),
  on(validatedInput, (state, { index, value, valid, conflicts }) => {
    const nextState = produce(state, (draft) => {
      if (!state.entities[index].valid) return state;
      draft.entities[index].value = value;
      draft.entities[index].valid = valid;
      draft.entities[index].conflicts = conflicts;
      draft.fieldsToSolve = draft.fieldsToSolve - 1;
      //conflicts
      if (conflicts.length > 0) {
        conflicts.forEach((index) => {
          draft.entities[index].conflicted = true;
        });
      }
    });
    return nextState;
  }),
  on(removeInvalid, (state, { index }) => {
    const nextState = produce(state, (draft) => {
      draft.entities[index].valid = true;
      draft.entities[index].value = null;
      draft.entities[index].conflicts = [];
      draft.fieldsToSolve = draft.fieldsToSolve + 1;
      //conflicts
      state.entities[index].conflicts.forEach((index) => {
        draft.entities[index].conflicted = false;
      });
    });
    return nextState;
  })
);

export function boardReducer(state: FieldState, action: Action) {
  return reducer(state, action);
}
export const {
  selectEntities,
  selectAll,
  selectIds,
  selectTotal,
} = fieldAdapter.getSelectors();
