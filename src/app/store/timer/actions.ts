import { createAction, props } from '@ngrx/store'

export const timePassed = createAction('[Timer component] increment timer')
export const reset = createAction('[Timer component] reset timer')
export const throttle = createAction('[Timer component] Time throttle', props<{ millis: number }>())
