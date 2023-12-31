import { createEffect, createEvent, createStore, sample } from "effector";
import * as Api from "@/shared/api";
import { getLocalizationFx } from "@/shared/api";

// variables
export const $Localization = createStore<Api.T_Localization>({});
export const $AvailableNetworks = createStore<Api.T_Networks>({ networks: [] });
export const $AvailableRpcs = createStore<Api.T_Rpcs>({ rpcs: [] });

export const $AvailableLeaderbord = createStore<Api.T_Lider>([]);

export const $AvailableTokens = createStore<Api.T_Tokens>({ tokens: [] });

export const $OpenseaData = createStore<Api.T_OpenseaData>({
  listings: [],
  next: "",
});

export const $AvilablesNftMarket = createStore<Api.T_NFTMarket>({ nfts: [] });
export const $AvailableBlocksExplorers = createStore<Map<
  number,
  string
> | null>(null);

// events
export const getLocalization = createEvent<string>();

export const queryOpenseaData = createEvent<string>();

export const queryAvailableNetworks = createEvent();
export const queryAvailableRpcs = createEvent<{ network_id: number }>();
export const setAvailableNetworks = createEvent<Api.T_Networks>();
export const setAvailableRpcs = createEvent<Api.T_Rpcs>();

export const setAvailableLeader = createEvent<Api.T_Lider>();

export const queryAvailableLeader = createEvent<{
  return: string;
  time: string;
}>();

export const queryNftMarket = createEvent<number>();

export const setAvailableTokens = createEvent<Api.T_Tokens>();
export const queryAvailableTokens = createEvent<{ network_id: number }>();
export const setAvailableExplorers = createEvent<Map<number, string>>();

// handlers
// $AvailableNetworks.on(Api.getNetworksFx.doneData, (_, payload) => {
//     return (payload.body as Api.T_Networks);
// });

$AvailableRpcs.on(Api.getRpcsFx.doneData, (_, payload) => {
  return payload.body as Api.T_Rpcs;
});

// $AvailableTokens.on(Api.getTokens.doneData, (_, payload) => {
//     return (payload.body as Api.T_Tokens);
// }).on(setAvailableTokens, (_, tokens) => tokens);

$AvailableTokens.on(setAvailableTokens, (_, tokens) => tokens);

$AvailableNetworks.on(setAvailableNetworks, (_, networks) => networks);
$AvailableRpcs.on(setAvailableRpcs, (_, rpcs) => rpcs);

$AvailableLeaderbord.on(setAvailableLeader, (_, leaderbord) => leaderbord);

//$AvailableTokens.on(setAvailableTokens, (_, tokens) => tokens);
$AvailableBlocksExplorers.on(setAvailableExplorers, (_, explorers) => {
  // var explorers_map = new Map<number, Api.T_BlockExplorerUrl>();
  // for (var exp of explorers.explorers) {
  //     explorers_map.set(exp.network_id, exp);
  // }
  // return explorers_map;
  return explorers;
});

// logic
sample({
  clock: queryOpenseaData,
  target: Api.getDataFromOpensea,
});
sample({
  clock: queryNftMarket,
  target: Api.GetNftMarket,
});
sample({
  clock: queryAvailableLeader,
  target: Api.getLeaderboard,
});
sample({
  clock: getLocalization,
  target: Api.getLocalizationFx,
});
sample({
  clock: queryAvailableNetworks,
  target: Api.getNetworksFx,
});
sample({
  clock: queryAvailableRpcs,
  target: Api.getRpcsFx,
});
sample({
  clock: queryAvailableTokens,
  target: Api.getTokens,
});
