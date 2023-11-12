import { createEffect, createEvent, createStore, sample } from "effector";

export enum RangeType {
  Bets,
  Rows,
}

// variables
export const $pickedValue = createStore<number>(1);

// events
export const pickValue = createEvent<number>();

// handlers
$pickedValue.on(pickValue, (_, current_bets) => current_bets);
