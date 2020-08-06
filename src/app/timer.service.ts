import { Injectable } from '@angular/core';
import { Subscription, interval } from 'rxjs'
import { Store } from '@ngrx/store'
import { timePassed, reset } from './store/timer/actions'

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor(
    private store: Store<{ timer: number }>
  ) { }
  subscription: Subscription;
  time$ = interval(1000)

  initialize() {
    this.subscription = this.time$.subscribe(_seconds => {
      this.store.dispatch(timePassed())
    })
  }
  pause() {
    if (!this.subscription.closed) {
      this.subscription.unsubscribe()
    }
  }
  start() {
    if (this.subscription.closed) {
      this.initialize()
    }
  }
  stop() {
    this.pause()
    this.store.dispatch(reset())
  }
  changeTimePass(millis: number) {
    this.pause()
    this.time$ = interval(millis)
    this.initialize()
  }

}
