import { createEffect, createEvent, createStore, sample } from "effector";

// variables
export const $betsAmount = createStore<number>(1);
export const $totalWager = createStore<number>(0);
export const $profitOnWin = createStore<number>(0);
export const $inputWager = createStore<string>("0");
export const $pickedNumber = createStore<number>(50.5);
export const $inputWagerDollars = createStore<string>("0");
export const $isPlaying = createStore<boolean>(false);

// events
export const setPlayingStatus = createEvent<boolean>();
export const setBetsAmount = createEvent<number>();
export const setTotalWager = createEvent<number>();
export const setProfitOnWin = createEvent<number>();
export const setWager = createEvent<string>();
export const pickNumber = createEvent<number>();
export const setWagerDollars = createEvent<string>();

// handlers
$betsAmount.on(setBetsAmount, (_, current_bets) => current_bets);
$totalWager.on(setTotalWager, (_, current_total) => current_total);
$profitOnWin.on(setProfitOnWin, (_, new_profit) => new_profit);
$inputWager.on(setWager, (_, new_wager) => new_wager);
$pickedNumber.on(pickNumber, (_, picked_number) => picked_number);
$inputWagerDollars.on(setWagerDollars, (_, wager) => wager);
$isPlaying.on(setPlayingStatus, (_, state) => state);
export enum DiceSide {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
}

// Variables
export const $active = createStore<boolean>(true);
export const $pickedSide = createStore<DiceSide>(DiceSide.One);

// Events
export const pickSide = createEvent<DiceSide>();
export const setActive = createEvent<boolean>();

// Handlers
$pickedSide.on(pickSide, (_, side) => side);
$active.on(setActive, (_, value) => value);
