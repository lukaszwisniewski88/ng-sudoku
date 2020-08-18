import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { FieldState } from '../store/board/field.interface';
import { indexTosquare } from '../common/utils';
import {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} from '../store/board/reducer';
const boardSelector = createFeatureSelector<FieldState>('board');

export const entitiesSelector = createSelector(boardSelector, (board) =>
  selectEntities(board)
);
export const fieldSelector = createSelector(
  boardSelector,
  (board: FieldState, props: { index: number }) => {
    let field = selectAll(board);
    return field[props.index];
  }
);
export const allFieldsSelector = createSelector(boardSelector, (board) =>
  selectAll(board)
);
export const actuallySelected = createSelector(boardSelector, (board) => {
  return board.actuallySelected;
});
export const distanceSelector = createSelector(
  fieldSelector,
  actuallySelected,
  (field, actuallySelected) => {
    if (actuallySelected.index !== null) {
      return Math.sqrt(
        Math.pow(field.coordinates.x - actuallySelected.coords.x, 2) +
          Math.pow(field.coordinates.y - actuallySelected.coords.y, 2)
      );
    } else return null;
  }
);
export const highlightLine = createSelector(
  fieldSelector,
  actuallySelected,
  (field, selected) => {
    if (selected.index === null) {
      return false;
    } else {
      return (
        (selected.coords.x === field.coordinates.x ||
          selected.coords.y === field.coordinates.y) &&
        field.value !== null
      );
    }
  }
);
export const highlightSquare = createSelector(
  fieldSelector,
  actuallySelected,
  (field, selected, props) => {
    if (selected.index === null) {
      return false;
    } else {
      return (
        indexTosquare(selected.index) === indexTosquare(props.index) &&
        field.value !== null
      );
    }
  }
);

export const loadingIndicator = createSelector(
  boardSelector,
  (board) => board.loadingIndicator
);
export const fieldsToSolve = createSelector(
  boardSelector,
  (board) => board.fieldsToSolve
);
