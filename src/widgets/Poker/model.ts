import { createEffect, createEvent, createStore, sample } from 'effector';


// variables
export const $gameState = createStore<any | null>(null);


// events
export const setGameState = createEvent<any | null>();

// handlers
$gameState.on(setGameState, (_, state) => state);