import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs';
import { fieldSelect } from '../store/board/actions';
import { Store } from '@ngrx/store';
import { Field } from '../store/board/field.interface';
import {
  fieldSelector,
  highlightSquare,
  highlightLine,
} from './store.selectors';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'board-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldComponent implements OnInit {
  constructor(private store: Store) {}
  @Input() index: number;
  highlightSquare$: Observable<boolean>;
  highlightLine$: Observable<boolean>;
  field$: Observable<Field>;

  ngOnInit(): void {
    this.field$ = this.store.select(fieldSelector, { index: this.index });
    this.highlightSquare$ = this.store.select(highlightSquare, {
      index: this.index,
    });
    this.highlightLine$ = this.store.select(highlightLine, {
      index: this.index,
    });
  }
  toggleSelect(event: MouseEvent) {
    let evtTarget = event.target as HTMLElement;
    if (
      !evtTarget.classList.contains('extValue') &&
      !evtTarget.classList.contains('invalid') &&
      !evtTarget.classList.contains('conflicted')
    ) {
      this.store.dispatch(fieldSelect({ index: this.index }));
    }
  }
}
