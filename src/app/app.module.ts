import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { ReactiveComponentModule } from '@ngrx/component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { boardReducer } from './store/board/reducer';
import { ValidateInputEffects } from './validate-input.effects';

import { TimerModule } from './timer/timer.module';
import { SudokuValidatorService } from './services/SudokuValidator/sudoku-validator.service';
import { SudokuWebService } from './sudoku-web.service';
import { BoardEffects } from './board.effects';
import { AppComponent } from './app.component';
import { FieldComponent } from './field/field.component';
import { KeyboardComponent } from './keyboard/keyboard.component';

@NgModule({
  declarations: [AppComponent, FieldComponent, KeyboardComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      board: boardReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([ValidateInputEffects, BoardEffects]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveComponentModule,
    TimerModule,
  ],
  providers: [SudokuValidatorService, SudokuWebService],
  bootstrap: [AppComponent],
})
export class AppModule {}
