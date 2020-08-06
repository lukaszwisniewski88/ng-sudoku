import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';

import { timerReducer } from './store/timer/reducer'
import { boardReducer } from './store/board/reducer'
import { actuallySelectedReducer } from './store/actuallySelected/reducer'
import { LineEffect } from './store/line.effect'
import { TimerEffect } from './store/timer.effect'

import { TimerService } from './timer.service'
import { TimePipe } from './time.pipe';

import { AppComponent } from './app.component';
import { FieldComponent } from './field/field.component';




@NgModule({
  declarations: [
    AppComponent,
    TimePipe,
    FieldComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      time: timerReducer,
      board: boardReducer,
      actuallySelected: actuallySelectedReducer
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([LineEffect, TimerEffect])
  ],
  providers: [TimerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
