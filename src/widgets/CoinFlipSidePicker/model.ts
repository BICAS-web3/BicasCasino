import { createEffect, createEvent, createStore, sample } from "effector";

export enum Side {
  Tails = 0,
  Heads = 1,
}

// variables
export const $active = createStore<boolean>(true);
export const $pickedSide = createStore<Side>(Side.Heads);

// events
export const pickSide = createEvent<Side>();
export const setActive = createEvent<boolean>();

// handlers
$pickedSide.on(pickSide, (_, side) => side);
$active.on(setActive, (_, value) => value);
