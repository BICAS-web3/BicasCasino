import { createEffect, createEvent, createStore, sample } from 'effector';

// variables
export const $stopGain = createStore<number | null>(null);
export const $stopLoss = createStore<number | null>(null);


// events
export const pickStopGain = createEvent<number | null>();
export const pickStopLoss = createEvent<number | null>();


// handlers
$stopGain.on(pickStopGain, (_, value) => value);
$stopLoss.on(pickStopLoss, (_, value) => value);
