import { createEffect, createEvent, createStore, sample } from 'effector';
import * as api from '@/shared/api';
import { useNetwork } from 'wagmi';

// variables
export const $Wagered = createStore<boolean>(false);

// events
export const pressButton = createEvent();
export const setWagered = createEvent<boolean>();

// handlers
$Wagered.on(pressButton, () => true).on(setWagered, (_, status) => status);
