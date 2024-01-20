import { createEffect, createEvent, createStore, sample } from "effector";
export enum GameStatus {
  Won,
  Lost,
  Draw,
}

// variables
export const $playSounds = createStore<string>("off");
export const $gameStatus = createStore<GameStatus | null>(null);
export const $isPlaying = createStore<boolean>(true);
export const $waitingResponse = createStore<boolean>(false);
export const $profit = createStore<number>(0);
export const $multiplier = createStore<number>(0);
export const $lost = createStore<number>(0);
export const $token = createStore<string>("");
export const $betValue = createStore<bigint>(BigInt(0));
export const $isEmtyWager = createStore<boolean>(false);
export const $refund = createStore<boolean>(false);

// events
export const setIsPlaying = createEvent<boolean>();
export const setWaitingResponse = createEvent<boolean>();
export const switchSounds = createEvent<string>();
export const setGameStatus = createEvent<GameStatus | null>();
export const setWonStatus = createEvent<{
  profit: number;
  multiplier: number;
  token: string;
}>();
export const setLostStatus = createEvent<number>();
export const clearStatus = createEvent();
export const setBetValue = createEvent<bigint>();
export const setIsEmtyWager = createEvent<boolean>();
export const setRefund = createEvent<boolean>();

// handlers
$betValue.on(setBetValue, (_, state) => state);
$isPlaying.on(setIsPlaying, (_, state) => state);
$waitingResponse.on(setWaitingResponse, (_, state) => state);
$playSounds.on(switchSounds, (old, state) => state);
$gameStatus.on(setGameStatus, (_, status) => status);

$profit.on(setWonStatus, (_, data) => data.profit).on(clearStatus, () => 0);
$multiplier
  .on(setWonStatus, (_, data) => data.multiplier)
  .on(clearStatus, () => 0);
$token.on(setWonStatus, (_, data) => data.token).on(clearStatus, () => "");
$lost.on(setLostStatus, (_, data) => data).on(clearStatus, () => 0);
$gameStatus.on(clearStatus, () => null);
$isEmtyWager.on(setIsEmtyWager, (_, state) => state);
$refund.on(setRefund, (_, state) => state);
