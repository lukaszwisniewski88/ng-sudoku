import { createAction, props } from '@ngrx/store';
import { ValidationErrors } from './field.interface';

export const fieldSelect = createAction(
  '[Board] field select',
  props<{ index: number }>()
);
export const validatedInput = createAction(
  '[Board] Validated field input ',
  props<{ index: number; value: number; valid: boolean; conflicts: number[] }>()
);
export const userInput = createAction(
  '[Board] Invalidated user input goes to the effect',
  props<{ index: number | null; value: number }>()
);
export const removeInvalid = createAction(
  '[Board] Remove Invalid field',
  props<{ index: number }>()
);
export const createWebBoard = createAction(
  '[Web Service] Board from API loaded',
  props<{ squares: { x: number; y: number; value: number }[] }>()
);
export const newGame = createAction('[Board] Want to have a new Sudoku Board');
export const fieldInvalid = createAction(
  '[EFFECT] delay removing ',
  props<{ index: number }>()
);
