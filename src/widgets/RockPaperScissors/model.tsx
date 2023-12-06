import { createEvent, createStore } from "effector";

export const $isPlaying = createStore<boolean>(false);

// events
export const setPlayingStatus = createEvent<boolean>();

export const $isGameValue = createStore<string>("Paper");

export const setGameValue = createEvent<string>();

// handlers
$isPlaying.on(setPlayingStatus, (_, state) => state);

$isGameValue.on(setGameValue, (_, state) => state);
