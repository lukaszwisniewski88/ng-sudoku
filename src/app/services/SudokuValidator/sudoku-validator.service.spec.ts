import { TestBed } from '@angular/core/testing';

import { SudokuValidatorService } from './sudoku-validator.service';

describe('SudokuValidatorService', () => {
  let service: SudokuValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SudokuValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
