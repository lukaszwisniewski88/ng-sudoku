import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SudokuValidatorService } from './services/SudokuValidator/sudoku-validator.service';
import {
  userInput,
  validatedInput,
  fieldInvalid,
  removeInvalid,
} from './store/board/actions';
import { mergeMap, switchMap, delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ValidateInputEffects {
  constructor(
    private actions$: Actions,
    private validator: SudokuValidatorService
  ) {}

  validateInput = createEffect(() =>
    this.actions$.pipe(
      ofType(userInput),
      mergeMap((action) => {
        return this.validator.validate(action.index, action.value).pipe(
          switchMap((validated) => {
            if (validated.valid === false) {
              return [
                validatedInput(validated),
                fieldInvalid({ index: validated.index }),
              ];
            } else return [validatedInput(validated)];
          })
        );
      })
    )
  );
  delayRemove = createEffect(() =>
    this.actions$.pipe(
      ofType(fieldInvalid),
      mergeMap((value) => {
        return of(removeInvalid({ index: value.index })).pipe(delay(500));
      })
    )
  );
}
