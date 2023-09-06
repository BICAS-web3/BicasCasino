import { createEffect, createEvent, createStore, sample } from 'effector';

export enum Symbol {
    Rock,
    Paper,
    Scissors
}

// variables
export const $betsAmount = createStore<number>(1);
export const $totalWager = createStore<number>(0);
export const $profitOnWin = createStore<number>(0);
export const $inputWager = createStore<string>('0');
export const $pickedSymbol = createStore<Symbol>(Symbol.Rock);
export const $inputWagerDollars = createStore<string>('0');

// events
export const setBetsAmount = createEvent<number>();
export const setTotalWager = createEvent<number>();
export const setProfitOnWin = createEvent<number>();
export const setWager = createEvent<string>();
export const pickSymbol = createEvent<Symbol>();
export const setWagerDollars = createEvent<string>();


// handlers
$betsAmount.on(setBetsAmount, (_, current_bets) => current_bets);
$totalWager.on(setTotalWager, (_, current_total) => current_total);
$profitOnWin.on(setProfitOnWin, (_, new_profit) => new_profit);
$inputWager.on(setWager, (_, new_wager) => new_wager);
$pickedSymbol.on(pickSymbol, (_, symbol) => symbol);
$inputWagerDollars.on(setWagerDollars, (_, wager) => wager);