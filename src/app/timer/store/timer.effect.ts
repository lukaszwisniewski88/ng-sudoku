import { TimerService } from '../timer.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { throttle } from './actions';

@Injectable()
export class TimerEffect {
  constructor(private service: TimerService, private actions$: Actions) {}

  throttleTime = createEffect(
    () =>
      this.actions$.pipe(
        ofType(throttle),
        map((action) => this.service.changeTimePass(action.millis))
      ),
    { dispatch: false }
  );
}
