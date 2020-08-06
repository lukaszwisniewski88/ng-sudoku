import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs'
import { select } from '../store/board/actions'
import { Store } from '@ngrx/store';
import { Field, FieldState } from '../store/board/field.interface';

@Component({
  selector: 'board-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  constructor(

    private store: Store<{ board: FieldState }>
  ) {
    this.value$ = store.
      select(state => {
        return state.board.entities[this.index].value
      })
    this.selected$ = store
      .select(state => state.board.entities[this.index].selected)
  }
  selected$: Observable<boolean>
  value$: Observable<number | null> = null
  @Input() index: number
  @Input() x: number
  @Input() y: number

  ngOnInit(): void {
  }

  toggleSelect() {
    this.store.dispatch(select({ index: this.index }))
  }

}
