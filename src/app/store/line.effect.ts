import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators'


@Injectable()
export class LineEffect {
    constructor(private actions$: Actions) { }
    listenAll$ = createEffect(() =>
        this.actions$.pipe(
            tap(val => console.log(val))
        ), { dispatch: false })
}