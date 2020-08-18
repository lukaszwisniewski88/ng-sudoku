import { TestBed } from '@angular/core/testing';

import { SudokuWebService } from './sudoku-web.service';

describe('SudokuWebService', () => {
  let service: SudokuWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SudokuWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
