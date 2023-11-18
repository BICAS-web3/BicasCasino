import { createEffect, createEvent, createStore, sample } from "effector";

// variables
export const $isOpen = createStore<boolean>(true);
export const $currentPick = createStore<number | null>(null);
export const $scrolledTop = createStore<number | null>(0);
export const $mobileLanguageBlock = createStore<boolean | null>(false);

// events
export const Open = createEvent<void>();
export const Close = createEvent<void>();
export const setScrolled = createEvent<void>();
export const setCurrentPick = createEvent<number | null>();
export const flipOpen = createEvent<void>();
export const setMobileLanguageBlock = createEvent<boolean | null>();

// handlers
$isOpen
  .on(Open, (_, __) => true)
  .on(Close, (_, __) => false)
  .on(flipOpen, (old, _) => !old);
$currentPick.on(setCurrentPick, (_, pick) => pick);
$scrolledTop.on(setScrolled, (_, val) => val);
$mobileLanguageBlock.on(setMobileLanguageBlock, (_, inp) => inp);
