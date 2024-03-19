import { createEvent, createStore } from "effector";

export const $isSignup = createStore<string>("up");

export const $access_token = createStore<string>("");
export const $refresh_token = createStore<string>("");

export const $isAuth = createStore<boolean>(true);

export const setIsSignup = createEvent<string>();
export const setAccessToken = createEvent<string>();
export const setRefreshToken = createEvent<string>();
export const setAuth = createEvent<boolean>();

$isSignup.on(setIsSignup, (_, state) => state);
$isAuth.on(setAuth, (_, state) => state);
$access_token.on(setAccessToken, (_, state) => state);
$refresh_token.on(setRefreshToken, (_, state) => state);
