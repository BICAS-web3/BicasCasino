import { createEvent, createStore } from "effector";

export const $startConnect = createStore<boolean>(false);

export const setConnect = createEvent<boolean>();

$startConnect.on(setConnect, (_, state) => state);

export const $isPartner = createStore<boolean>(false);

export const setIsPartner = createEvent<boolean>();

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
