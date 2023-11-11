import { createEffect, createEvent, createStore, sample } from 'effector';

export enum RangeType {
    Bets,
    Rows
}

// variables
export const $pickedValue = createStore<number>(1);
export const $pickedRows = createStore<number>(8);

// events
export const pickValue = createEvent<number>();
export const pickRows = createEvent<number>();

// handlers
$pickedValue.on(pickValue, (_, current_bets) => current_bets);
$pickedRows.on(pickRows, (_, rows) => rows);