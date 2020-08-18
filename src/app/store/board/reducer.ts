import { createReducer, on, Action } from '@ngrx/store';
import { produce } from 'immer';
import { indexToCoords } from '../../common/utils';
import {
  fieldSelect,
  validatedInput,
  removeInvalid,
  createWebBoard,
  newGame,
} from './actions';
import { Field, Fields, FieldState, CoordsMapping } from './field.interface';

const BOARD_SIZE = 9;

const createInitialState = (): FieldState => {
  let idArray = [...Array(Math.pow(BOARD_SIZE, 2)).keys()];
  let entities: Fields = [];
  let coordsMap: CoordsMapping = {};
  idArray.forEach((_value, index) => {
    let coords = indexToCoords(index);
    entities[index] = { ...createEmptyField(index) };
    coordsMap[`${coords.x},${coords.y}`] = index;
  });
  return {
    ids: idArray,
    entities: entities,
    coordsMap,
    loadingIndicator: false,
    fieldsToSolve: idArray.length,
    actuallySelected: {
      coords: null,
      index: null,
    },
  };
};
const createEmptyField = (index): Field => {
  return {
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
  createInitialState(),
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
  on(newGame, (state) => {
    const nextState = produce(state, (draft) => {
      draft.loadingIndicator = true;
    });
    return nextState;
  }),
  on(createWebBoard, (state, { squares }) => {
    const nextState = produce(state, (draft) => {
      draft.loadingIndicator = false;
      draft.ids.forEach((index) => {
        draft.entities[index] = createEmptyField(index);
      });
      draft.fieldsToSolve = draft.ids.length;
      squares.forEach((element) => {
        draft.entities[state.coordsMap[`${element.x},${element.y}`]].value =
          element.value;
        draft.entities[
          state.coordsMap[`${element.x},${element.y}`]
        ].fixed = true;
        draft.fieldsToSolve = draft.fieldsToSolve - 1;
      });
    });
    return nextState;
  }),
  on(validatedInput, (state, { index, value, valid, conflicts }) => {
    const nextState = produce(state, (draft) => {
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
