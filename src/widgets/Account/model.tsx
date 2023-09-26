import { createEffect, createEvent, createStore, sample } from "effector";
import * as Api from "@/shared/api";
import { DLinkedList } from "@/shared/DS";

export const $isHeaderAccountOpened = createStore<boolean>(false);

export const Open = createEvent<void>();
export const Close = createEvent<void>();

$isHeaderAccountOpened.on(Open, (_, __) => true).on(Close, (_, __) => false);

// variables
// export const $Nickname = createStore<Api.T_Nickname[]>([]);

// // events
// export const newBet = createEvent<Api.T_BetInfo>();
// export const setBets = createEvent<Api.T_BetInfo[]>();

// // handlers
// $Bets.on(setBets, (_, new_bets) => new_bets).on(newBet, (list, new_bet) => {
//     list.unshift(new_bet);
//     if (list.length > 10) {
//         list.pop();
//     };
// });
