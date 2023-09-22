import {createEvent, createStore} from "effector";

export const $isMainWalletOpen = createStore<boolean>(false);

export const Open = createEvent<void>();
export const Close = createEvent<void>();

$isMainWalletOpen.on(Open, (_, __) => true)
    .on(Close, (_, __) => false)