// import { createEffect, createEvent, createStore, sample } from "effector";

// // variables
// export const $isSwapOpen = createStore<boolean>(false);
// export const $currentPick = createStore<number | null>(null);

// // events
// export const Open = createEvent<void>();
// export const Close = createEvent<void>();
// export const setCurrentPick = createEvent<number | null>();
// export const flipSwapOpen = createEvent<void>();

// // handlers
// $isSwapOpen
//   .on(Open, (_, __) => true)
//   .on(Close, (_, __) => false)
//   .on(flipSwapOpen, (old, _) => !old);
// $currentPick.on(setCurrentPick, (_, pick) => pick);
