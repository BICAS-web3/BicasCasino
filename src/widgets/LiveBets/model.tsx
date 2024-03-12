import { createEffect, createEvent, createStore, sample } from "effector";
import * as Api from "@/shared/api";
import { DLinkedList } from "@/shared/DS";

interface IResult {
  type: string;
  id: number;
  timestamp: number;
  amount: string;
  profit: string;
  bet_info: string;
  game_id: number;
  user_id: number;
  coin_id: number;
  userseed_id: number;
  serverseed_id: number;
  outcomes: number[];
  uuid: string;
  state?: string;
}

// variables
export const $Bets = createStore<Api.T_BetInfo[]>([]);

export const $result = createStore<IResult | null>(null);

// events
export const newBet = createEvent<Api.T_BetInfo>();
export const setBets = createEvent<Api.T_BetInfo[]>();
export const setResult = createEvent<IResult | null>();
// handlers
$Bets
  .on(setBets, (_, new_bets) => new_bets)
  .on(newBet, (list, new_bet) => {
    list.unshift(new_bet);
    if (list.length > 10) {
      list.pop();
    }
  });

$result.on(setResult, (_, state) => state);
