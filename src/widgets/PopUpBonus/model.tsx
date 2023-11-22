import { createEvent, createStore } from "effector";

export const $showState = createStore<boolean>(false);


export const setShowState = createEvent<boolean>();

$showState.on(setShowState, (_, state) => state);

