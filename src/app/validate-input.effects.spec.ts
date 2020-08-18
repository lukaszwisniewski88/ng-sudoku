import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ValidateInputEffects } from './validate-input.effects';

describe('ValidateInputEffects', () => {
  let actions$: Observable<any>;
  let effects: ValidateInputEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ValidateInputEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ValidateInputEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
