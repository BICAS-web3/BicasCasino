import { createEffect, createEvent, createStore, sample } from 'effector';

export enum CoinSide {
    Tails,
    Heads,
}

// variables
export const $betsAmount = createStore<number>(1);
export const $totalWager = createStore<number>(0);
export const $profitOnWin = createStore<number>(0);
export const $inputWager = createStore<string>('0');
export const $pickedSide = createStore<CoinSide>(CoinSide.Heads);
export const $inputWagerDollars = createStore<string>('0');

// events
export const setBetsAmount = createEvent<number>();
export const setTotalWager = createEvent<number>();
export const setProfitOnWin = createEvent<number>();
export const setWager = createEvent<string>();
export const pickSide = createEvent<CoinSide>();
export const setWagerDollars = createEvent<string>();


// handlers
$betsAmount.on(setBetsAmount, (_, current_bets) => current_bets);
$totalWager.on(setTotalWager, (_, current_total) => current_total);
$profitOnWin.on(setProfitOnWin, (_, new_profit) => new_profit);
$inputWager.on(setWager, (_, new_wager) => new_wager);
$pickedSide.on(pickSide, (_, picked_side) => picked_side);
$inputWagerDollars.on(setWagerDollars, (_, wager) => wager);