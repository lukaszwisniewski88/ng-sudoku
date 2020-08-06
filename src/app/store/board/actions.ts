import { createAction, props } from '@ngrx/store'

export const select = createAction('[Board] field select', props<{ index: number }>())