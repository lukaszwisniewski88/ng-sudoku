import { createFeatureSelector, createSelector } from '@ngrx/store';

export const timer = createFeatureSelector<{ timer: number }>('timer');

export const value = createSelector(timer, (timer) => timer.timer);
