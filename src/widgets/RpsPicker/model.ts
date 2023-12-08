import { createEvent, createStore } from "effector";

export enum RPSValue {
  Rock = 0,
  Paper = 1,
  Scissors = 2,
}

// variables
export const $active = createStore<boolean>(true);
export const $pickedValue = createStore<RPSValue>(RPSValue.Paper);

// events
export const pickValue = createEvent<RPSValue>();
export const setActive = createEvent<boolean>();

// handlers
$pickedValue.on(pickValue, (_, value) => value);
$active.on(setActive, (_, value) => value);
