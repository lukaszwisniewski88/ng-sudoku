import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { FieldState } from '../store/board/field.interface';
import { indexTosquare } from '../common/utils';

const boardSelector = createFeatureSelector<FieldState>('board');

export const entitiesSelector = createSelector(
  boardSelector,
  (board) => board.entities
);
export const fieldSelector = createSelector(
  boardSelector,
  (board: FieldState, props: { index: number }) => {
    console.log('called highlight');
    return board.entities[props.index];
  }
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
