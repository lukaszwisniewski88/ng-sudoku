import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  FieldState,
  ValidationErrors,
} from 'src/app/store/board/field.interface';
import { indexTosquare, indextoColumn, indextoRow } from '../../common/utils';
import { Observable, ReplaySubject } from 'rxjs';
import { entitiesSelector } from '../../field/store.selectors';

@Injectable({
  providedIn: 'root',
})
export class SudokuValidatorService {
  constructor(private store: Store) {}
  ids = [...Array(Math.pow(9, 2)).keys()];
  board$ = this.store.pipe(select(entitiesSelector));
  private isValid(validation: ValidationErrors) {
    let valid = true;
    for (let value in validation) {
      if (!validation[value]) valid = false;
    }
    return valid;
  }
  private isUnique(
    checkIds: number[],
    checkValue: number
  ): { unique: boolean; conflicts: number[] } {
    let conflicts: number[] = [];
    this.board$
      .subscribe((field) => {
        checkIds.forEach((id) => {
          if (field[id].value === checkValue) conflicts.push(id);
        });
      })
      .unsubscribe();
    if (conflicts && conflicts.length > 0) return { unique: false, conflicts };
    else return { unique: true, conflicts: [] };
  }
  private isUniqueInRow(
    index: number,
    checkValue: number
  ): { unique: boolean; conflicts: number[] } {
    let row = indextoRow(index);
    let rowIds = this.ids.filter((id) => indextoRow(id) === row);
    return this.isUnique(rowIds, checkValue);
  }
  private isUniqueInCol(
    index: number,
    checkValue: number
  ): { unique: boolean; conflicts: number[] } {
    let col = indextoColumn(index); //
    let colIds = this.ids.filter((id) => indextoColumn(id) === col);
    return this.isUnique(colIds, checkValue);
  }
  private isUniqueInSquare(
    index: number,
    checkValue: number
  ): { unique: boolean; conflicts: number[] } {
    let square = indexTosquare(index); //
    let squareIds = this.ids.filter((id) => indexTosquare(id) === square); //
    return this.isUnique(squareIds, checkValue);
  }

  validate(
    index: number,
    value: number
  ): Observable<{
    index: number;
    value: number;
    valid: boolean;
    conflicts: number[];
  }> {
    let actualValidation = new ReplaySubject<{
      index: number;
      value: number;
      valid: boolean;
      conflicts: number[];
    }>(0);
    let valid: boolean;
    if (index !== null) {
      let process = {
        col: this.isUniqueInRow(index, value),
        row: this.isUniqueInCol(index, value),
        square: this.isUniqueInSquare(index, value),
      };
      valid = this.isValid({
        col: process.col.unique,
        row: process.row.unique,
        square: process.square.unique,
      });
      actualValidation.next({
        index,
        value,
        valid,
        conflicts: [
          ...process.col.conflicts,
          ...process.row.conflicts,
          ...process.square.conflicts,
        ],
      });
    } else actualValidation.error('Selected field cannot be null'); // Field not selected, validation error!!
    return actualValidation;
  }
  //validate

  //1 step is the field value unique in row
  //2 step is the field value unique in column
  //3 step is the field value unique in square
  //if all true, field is valid, if one is false field is invalid

  //input Observable strem of user inputs : selectedField: Field.id,  key: number in range(1,9) timestamp:"..."
  //output {valid}: true|false, conflict: Fields
}
