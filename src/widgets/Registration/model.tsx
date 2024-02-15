import { createEvent, createStore } from "effector";

export const $isSignup = createStore<string>("in");

export const $isAuth = createStore<boolean>(false);

export const setIsSignup = createEvent<string>();

export const setAuth = createEvent<boolean>();

$isSignup.on(setIsSignup, (_, state) => state);
$isAuth.on(setAuth, (_, state) => state);
