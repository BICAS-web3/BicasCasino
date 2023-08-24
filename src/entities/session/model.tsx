import { createEffect, createEvent, createStore, sample } from 'effector';
import * as Api from '@/shared/api';


// variables
export const $currentPage = createStore<string>('');
export const $currentWalletAddress = createStore<string | null>(null);
export const $currentNickname = createStore<string | null>(null);
export const $currentNetwork = createStore<Api.T_NetworkInfo | null>(null);
export const $currentToken = createStore<Api.T_Token | null>(null);
export const $currentTokenDecimals = createStore<number>(0);
export const $availableAmount = createStore<number>(0);

// events
export const setCurrentPage = createEvent<string>();
export const logIn = createEvent<{ address: string }>();
export const logOut = createEvent();
export const pickNetwork = createEvent<Api.T_NetworkInfo | null>();
export const setCurrentWalletAddress = createEvent<string | null>();
export const setCurrentNickname = createEvent<string | null>();
export const pickToken = createEvent<Api.T_Token | null>();
export const setDecimals = createEvent<number>();
export const setAvailableAmount = createEvent<number>();

// handlers
$currentPage.on(setCurrentPage, (_, current_page) => current_page);

$currentNetwork.on(pickNetwork, (_, picked_network) => picked_network);

$currentToken.on(pickToken, (_, token) => token);

$currentWalletAddress
    .on(logIn, (_, payload) => payload.address)
    .on(logOut, (_, __) => null);

$currentNickname
    .on(Api.getUsernameFx.doneData, (_, payload) => { console.log(payload); return ((payload.body as Api.T_Nickname).nickname); })
    .on(logOut, (_, __) => null)
    .on(setCurrentNickname, (_, nickname) => nickname);

$availableAmount.on(setAvailableAmount, (_, amount) => amount);

$currentTokenDecimals.on(setDecimals, (_, decimals) => decimals);

// logic
sample({
    clock: logIn,
    target: Api.getUsernameFx
})
