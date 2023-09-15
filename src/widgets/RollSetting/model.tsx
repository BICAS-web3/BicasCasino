import { createEffect, createEvent, createStore, sample } from 'effector';
import * as Api from '@/shared/api';


// variables
export const $RollValue = createStore<number>(50.5);
export const $RollOver = createStore<boolean>(true);


// events
export const setRollValue = createEvent<number>();
export const setRollOver = createEvent<boolean>();
export const flipRollOver = createEvent<number>();

// handlers
$RollValue.on(setRollValue, (_, value) => value);
$RollOver
    .on(setRollOver, (_, rollOver) => rollOver)
    .on(flipRollOver, (old_value, old_roll_value) => { setRollValue(100 - old_roll_value); return (!old_value) });