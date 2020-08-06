import { Component } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs'
import { Store, select } from '@ngrx/store'
import { TimerService } from './timer.service';
import { throttle } from './store/timer/actions'
import { Field } from './store/board/field.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private store: Store<{ time: number }>,
    private timer: TimerService
  ) {
    this.secondsPassed$ = store.pipe(select('time'))
  }

  count$: Observable<number>;
  secondsPassed$: Observable<number>;
  Arr = [...Array(9).keys()]
  title = 'ng-sudoku';
  difficulty = "Hard";
  boardSize = 9;
  boardChunk(square: number): number[] {
    let boardMock = [...Array(9 * 9).keys()]
    let start = square * 9
    let end = start + 9
    return boardMock.slice(start, end)
  }
  ngOnInit() {
    this.timer.initialize()
  }
  ngOnDestroy() {
    console.log('DESTROY!')
  }
  incrementCounter() {
  }
  pauseTimer() {
    this.timer.pause()
  }
  restartTimer() {
    this.timer.start()
  }
  stopTimer() {
    this.timer.stop()
  }
  speedUp() {
    this.store.dispatch(throttle({ millis: 10 }))
  }
  resetSpeed() {
    this.store.dispatch(throttle({ millis: 1000 }))
  }
}
