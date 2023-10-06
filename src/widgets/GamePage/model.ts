import { createEffect, createEvent, createStore, sample } from 'effector';
export enum GameStatus {
    Won,
    Lost,
    Draw
};

// variables
export const $playSounds = createStore<boolean>(false);
export const $gameStatus = createStore<GameStatus | null>(null);

export const $profit = createStore<number>(0);
export const $multiplier = createStore<number>(0);
export const $lost = createStore<number>(0);
export const $token = createStore<string>('');

// events
export const switchSounds = createEvent<void>();
export const setGameStatus = createEvent<GameStatus | null>();
export const setWonStatus = createEvent<{ profit: number, multiplier: number, token: string }>();
export const setLostStatus = createEvent<number>();
export const clearStatus = createEvent();

// handlers
$playSounds.on(switchSounds, (old, _) => !old);
$gameStatus.on(setGameStatus, (_, status) => status);

$profit
    .on(setWonStatus, (_, data) => data.profit)
    .on(clearStatus, () => 0);
$multiplier
    .on(setWonStatus, (_, data) => data.multiplier)
    .on(clearStatus, () => 0);
$token
    .on(setWonStatus, (_, data) => data.token)
    .on(clearStatus, () => '');
$lost
    .on(setLostStatus, (_, data) => data)
    .on(clearStatus, () => 0);
$gameStatus.on(clearStatus, () => null);