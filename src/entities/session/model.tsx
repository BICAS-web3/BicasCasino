import { createEffect, createEvent, createStore, sample } from 'effector';
import * as Api from '@/shared/api';


// variables
export const $currentPage = createStore<string>('');
export const $currentWalletAddress = createStore<string | null>(null);
export const $currentNickname = createStore<string | null>(null);

// events
export const setCurrentPage = createEvent<string>();
export const logIn = createEvent<{ address: string }>();
export const logOut = createEvent();


// handlers
$currentPage.on(setCurrentPage, (_, current_page) => current_page);

$currentWalletAddress
    .on(logIn, (_, payload) => payload.address)
    .on(logOut, (_, __) => null);

$currentNickname
    .on(Api.getUsernameFx.doneData, (_, payload) => { console.log(payload); return ((payload.body as Api.T_Nickname).nickname); })
    .on(logOut, (_, __) => null);


sample({
    clock: logIn,
    target: Api.getUsernameFx
})
