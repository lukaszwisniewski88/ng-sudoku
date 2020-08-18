import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePipe } from './time.pipe';
import { timerReducer } from './store/reducer';
import { TimerEffect } from './store/timer.effect';
import { TimerService } from './timer.service';
import { TimerComponent } from './timer.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [TimePipe, TimerComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('timer', {
      timer: timerReducer,
    }),
    EffectsModule.forFeature([TimerEffect]),
  ],
  providers: [TimerService],
  exports: [TimerComponent],
})
export class TimerModule {}
