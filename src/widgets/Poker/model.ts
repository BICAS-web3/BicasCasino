import { createEffect, createEvent, createStore, sample } from "effector";

// variables
export const $gameState = createStore<any | null>(null);
export const $watchState = createStore<any | null>(null);
export const $showFlipCards = createStore<boolean>(false);
export const $isPlaying = createStore<boolean>(false);
// events
export const setGameState = createEvent<any | null>();
export const setWatchState = createEvent<any | null>();
export const flipShowFlipCards = createEvent();
export const setShowFlipCards = createEvent<boolean>();
export const setIsPlaying = createEvent<boolean>();

// handlers
$gameState.on(setGameState, (_, state) => state);
$showFlipCards
  .on(flipShowFlipCards, (prev, _) => !prev)
  .on(setShowFlipCards, (_, cur) => cur);
$isPlaying.on(setIsPlaying, (_, state) => state);
$watchState.on(setWatchState, (_, state) => state);
