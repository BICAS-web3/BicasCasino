import { createEvent, createStore } from "effector";

export enum Action {
  Success,
  Error,
  Waiting,
}

export interface NotificationProps {
  action?: Action;
}

export const setCurrentAction = createEvent<NotificationProps>();
export const $currentAction = createStore<NotificationProps | null>(null).on(
  setCurrentAction,
  (_, payload) => payload
);
