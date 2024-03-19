import { createEffect, createEvent, createStore, sample } from "effector";
import * as Api from "@/shared/api";
import { DLinkedList } from "@/shared/DS";

export interface IResult {
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
  outcomes: string;
  profits: string;
  uuid: string;
  state?: string | undefined;
  payouts: string;
  num_games?: number;
}

// variables
export const $Bets = createStore<Api.T_BetInfo[]>([]);

export const $tokenId = createStore<null | number>(null);
export const $result = createStore<IResult | null>(null);
export const $uuid = createStore<string | null>(null);

// events
export const newBet = createEvent<Api.T_BetInfo>();
export const setBets = createEvent<Api.T_BetInfo[]>();
export const setResult = createEvent<IResult | null>();
export const setTokenId = createEvent<number>();
export const setUuid = createEvent<string>();

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
$tokenId.on(setTokenId, (_, state) => state);
$uuid.on(setUuid, (_, state) => state);
