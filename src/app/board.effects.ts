import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SudokuWebService } from './sudoku-web.service';
import { newGame, createWebBoard } from './store/board/actions';
import { exhaustMap, map } from 'rxjs/operators';



@Injectable()
export class BoardEffects {



  constructor(private actions$: Actions, private webSudoku: SudokuWebService) { }

  newBoard = createEffect(() => {
    return this.actions$.pipe(
      ofType(newGame),
      exhaustMap(_action =>
        this.webSudoku.getFireBoard().pipe(
          map(board => createWebBoard({ squares: board.squares }))
        )
      )
    )
  })

}
