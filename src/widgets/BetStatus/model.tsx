import { createEffect, createEvent, createStore, sample } from 'effector';

// variables
export const $Won = createStore<boolean | null>(null);

// events
export const setWon = createEvent<boolean | null>();

// handlers
$Won.on(setWon, (_, status) => status);