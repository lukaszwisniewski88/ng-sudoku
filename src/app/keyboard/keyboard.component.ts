import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { fromEvent, Subscription, Observable, merge, Subject } from 'rxjs';
import {
  filter,
  map,
  concatMap,
  withLatestFrom,
  tap,
  exhaustMap,
} from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { actuallySelected, fieldSelector } from '../field/store.selectors';
import { userInput } from '../store/board/actions';
import { FieldState, SelectedStore } from '../store/board/field.interface';
import { value } from '../timer/store/selectors';

interface ButtonClick {
  key: string;
  timeStamp: number;
}

@Component({
  selector: 'board-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardComponent implements OnInit {
  constructor(private store: Store) {}
  @Input() keys: Array<number>;
  selectedIndex$: Observable<SelectedStore>;
  keyboard$: Observable<KeyboardEvent>;
  buttonClick$: Subject<ButtonClick>;

  clickHandler(event: MouseEvent) {
    let target = event.target as HTMLElement;
    this.buttonClick$.next({
      key: target.textContent,
      timeStamp: event.timeStamp,
    });
  }

  ngOnInit() {
    this.selectedIndex$ = this.store.select(actuallySelected);
    this.buttonClick$ = new Subject();
    this.keyboard$ = fromEvent<KeyboardEvent>(document, 'keyup').pipe(
      filter((value) => value.code.includes('Digit'))
    );
    merge(this.buttonClick$, this.keyboard$)
      .pipe(
        withLatestFrom(this.selectedIndex$),
        map((values) => {
          return {
            selectedField: values[1].index,
            key: values[0].key,
          };
        })
      )
      .subscribe({
        next: (key) => {
          this.store.dispatch(
            userInput({ index: key.selectedField, value: +key.key })
          );
        },
        complete: () => console.log('keyboard completed'),
      });
  }

  trackById(index: number) {
    return index;
  }
  ngOnDestroy() {}
}
