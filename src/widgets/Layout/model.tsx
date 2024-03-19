import { createEvent, createStore } from "effector";

export const $startConnect = createStore<boolean>(false);

export const setConnect = createEvent<boolean>();

export const $socketAuth = createStore<boolean>(false);

export const $socketLogged = createStore<boolean>(false);

export const $socketReset = createStore<number>(0);

$startConnect.on(setConnect, (_, state) => state);

export const $isPartner = createStore<boolean>(false);

export const setIsPartner = createEvent<boolean>();

export const setSocketAuth = createEvent<boolean>();

export const setSocketLogged = createEvent<boolean>();

export const setSocketReset = createEvent();

export type UserType = {
  type: string;
  id: number;
  registration_time: number;
  username: string;
};

export const $userInfo = createStore<UserType | null>(null);

export const setUserInfo = createEvent<UserType>();

$isPartner.on(setIsPartner, (_, state) => state);

$userInfo.on(setUserInfo, (_, state) => state);

$socketAuth.on(setSocketAuth, (_, state) => state);

$socketLogged.on(setSocketLogged, (_, state) => state);

$socketReset.on(setSocketReset, (state) => state + 1);
