import { Component, OnInit } from '@angular/core';
import { TimerService } from './timer.service';
import { Store, select } from '@ngrx/store';
import { reset, throttle, timePassed } from './store/actions';
import { Observable } from 'rxjs';
import { value } from './store/selectors';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit {
  constructor(private service: TimerService, private store: Store) {}
  secondsPassed$: Observable<number>;
  ngOnInit(): void {
    this.secondsPassed$ = this.store.select(value);
    this.service.initialize();
    //
  }
  pauseTimer() {
    this.service.pause();
  }
  restartTimer() {
    this.service.start();
  }
  stopTimer() {
    this.service.stop();
  }
  speedUp() {
    this.store.dispatch(throttle({ millis: 10 }));
  }
  resetSpeed() {
    this.store.dispatch(throttle({ millis: 1000 }));
  }
}
