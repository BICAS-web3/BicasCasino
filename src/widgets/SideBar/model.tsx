import { createEffect, createEvent, createStore, sample } from 'effector';


// variables
export const $isOpen = createStore<boolean>(true);
export const $currentPick = createStore<number | null>(null);

// events
export const Open = createEvent<void>();
export const Close = createEvent<void>();
export const setCurrentPick = createEvent<number | null>();
export const flipOpen = createEvent<void>();

// handlers
$isOpen.on(Open, (_, __) => true)
    .on(Close, (_, __) => false)
    .on(flipOpen, (old, _) => !old);
$currentPick.on(setCurrentPick, (_, pick) => pick);
