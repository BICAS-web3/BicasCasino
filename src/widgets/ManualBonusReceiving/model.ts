import { createEvent, createStore } from "effector";

export enum SubPage {
  Start,
  WalletPresence,
  ExchangeCreation,
}

export const $step = createStore<number>(0);
export const $subPage = createStore<SubPage>(SubPage.Start);

export const setStep = createEvent<number>();
export const setSubPage = createEvent<SubPage>();

$step.on(setStep, (_, state) => state);
$subPage.on(setSubPage, (_, state) => state);
