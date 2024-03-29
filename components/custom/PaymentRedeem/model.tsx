import { createEvent, createStore } from "effector";

export const $securityModalVisibility = createStore<boolean>(false);

export const setSecurityModalVisibility = createEvent<boolean>();

$securityModalVisibility.on(setSecurityModalVisibility, (_, state) => state);
