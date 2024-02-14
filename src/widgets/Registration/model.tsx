import { createEvent, createStore } from "effector";

export const $isSignup = createStore<string>("in");

export const setIsSignup = createEvent<string>();

$isSignup.on(setIsSignup, (_, state) => state);
