import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { SudokuWebService } from './sudoku-web.service';
import { newGame } from './store/board/actions';
import { loadingIndicator, fieldsToSolve } from './field/store.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private webSudoku: SudokuWebService) {}
  boardLoading$: Observable<boolean>;
  secondsPassed$: Observable<number>;
  fieldsToSolve$: Observable<number>;
  Arr = [...Array(9).keys()];
  title = 'ng-sudoku';
  difficulty = 'Hard';
  boardSize = 9;
  boardChunk(square: number): number[] {
    let boardMock = [...Array(9 * 9).keys()];
    let start = square * 9;
    let end = start + 9;
    return boardMock.slice(start, end);
  }
  ngOnInit() {
    this.fieldsToSolve$ = this.store.select(fieldsToSolve);
    this.boardLoading$ = this.store.select(loadingIndicator);
    this.store.dispatch(newGame());
  }
  ngOnDestroy() {
    console.log('DESTROY!');
  }
}
