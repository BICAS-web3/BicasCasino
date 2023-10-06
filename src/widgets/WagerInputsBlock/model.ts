import { createEffect, createEvent, createStore, sample } from 'effector';
import * as api from '@/shared/api';
import { useNetwork } from 'wagmi';

// variables
export const $cryptoValue = createStore<number>(0);
//export const $exchangeRate = createStore<number>(0);
export const $pickedToken = createStore<api.T_Token | null>(null);

// events
export const setCryptoValue = createEvent<number>();
//export const setExchangeRate = createEvent<number>();
export const pickToken = createEvent<api.T_Token>();
export const unpickToken = createEvent();


// handlers
$cryptoValue.on(setCryptoValue, (_, value) => value);
//$exchangeRate.on(setExchangeRate, (_, rate) => rate);
$pickedToken.on(pickToken, (_, token) => token).on(unpickToken, () => null);

