import { createEvent, createStore } from "effector";

export const $startConnect = createStore<boolean>(false);

export const setConnect = createEvent<boolean>();

$startConnect.on(setConnect, (_, state) => state);
