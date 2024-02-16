import { createEffect, createEvent, createStore } from "effector";

export type bjStep = "Hit" | "Stand" | "Split" | "Double" | null;

export const $btnsActive = createStore(false);
export const $activeStep = createStore<bjStep>(null);
export const $userCount = createStore<number>(0);
export const $dilerCount = createStore<number>(0);

export const setBtnsActive = createEvent<boolean>();
export const setActiveStep = createEvent<bjStep>();
export const setUserCount = createEvent<number>();
export const setDilerCount = createEvent<number>();

$btnsActive.on(setBtnsActive, (_, state) => state);
$activeStep.on(setActiveStep, (_, state) => state);
$userCount.on(setUserCount, (_, state) => state);
$dilerCount.on(setDilerCount, (_, state) => state);
