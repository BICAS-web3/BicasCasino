import { createEffect, createEvent, createStore, sample } from "effector";
import * as Api from "@/shared/api";
import { DLinkedList } from "@/shared/DS";

// variables
export const $Bets = createStore<Api.T_BetInfo[]>([]);

// events
export const newBet = createEvent<Api.T_BetInfo>();
export const setBets = createEvent<Api.T_BetInfo[]>();

// handlers
$Bets
  .on(setBets, (_, new_bets) => new_bets)
  .on(newBet, (list, new_bet) => {
    list.unshift(new_bet);
    if (list.length > 10) {
      list.pop();
    }
  });
