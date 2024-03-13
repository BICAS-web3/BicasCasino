import { createEvent, createStore } from "effector";

export const $isDrax = createStore<boolean>(false);
export const $balance = createStore<number>(0);

export const setIsDrax = createEvent<boolean>();
export const setBalance = createEvent<number>();

$isDrax.on(setIsDrax, (_, state) => state);
$balance.on(setBalance, (_, state) => state);