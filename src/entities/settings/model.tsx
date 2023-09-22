import { createEffect, createEvent, createStore, sample } from 'effector';
import * as Api from '@/shared/api';
import {getLocalizationFx} from "@/shared/api";

// variables
export const $Localization = createStore<Api.T_Localization>({})
export const $AvailableNetworks = createStore<Api.T_Networks>({ networks: [] });
export const $AvailableRpcs = createStore<Api.T_Rpcs>({ rpcs: [] });
export const $AvailableTokens = createStore<Api.T_Tokens>({ tokens: [] });
export const $AvailableBlocksExplorers = createStore<Map<number, Api.T_BlockExplorerUrl> | null>(null);

// events
export const getLocalization = createEvent<string>()
export const queryAvailableNetworks = createEvent();
export const queryAvailableRpcs = createEvent<{ network_id: number }>();
export const setAvailableNetworks = createEvent<Api.T_Networks>();
export const setAvailableRpcs = createEvent<Api.T_Rpcs>();
export const setAvailableTokens = createEvent<Api.T_Tokens>();
export const queryAvailableTokens = createEvent<{ network_id: number }>();
export const setAvailableExplorers = createEvent<Api.T_BlockExplorers>();

// handlers
$AvailableNetworks.on(Api.getNetworksFx.doneData, (_, payload) => {
    console.log(`Networks: ${JSON.stringify(payload)}`);
    return (payload.body as Api.T_Networks);
});

$AvailableRpcs.on(Api.getRpcsFx.doneData, (_, payload) => {
    console.log(`Networks: ${JSON.stringify(payload)}`);
    return (payload.body as Api.T_Rpcs);
})

$AvailableTokens.on(Api.getTokens.doneData, (_, payload) => {
    console.log(`Tokens: ${JSON.stringify(payload)}`);
    return (payload.body as Api.T_Tokens);
})

$AvailableNetworks.on(setAvailableNetworks, (_, networks) => networks);
$AvailableRpcs.on(setAvailableRpcs, (_, rpcs) => rpcs);
$AvailableTokens.on(setAvailableTokens, (_, tokens) => tokens);
$AvailableBlocksExplorers.on(setAvailableExplorers, (_, explorers) => {
    var explorers_map = new Map<number, Api.T_BlockExplorerUrl>();
    for (var exp of explorers.explorers) {
        explorers_map.set(exp.network_id, exp);
    }
    return explorers_map;
});



// logic
sample({
    clock: getLocalization,
    target: Api.getLocalizationFx
})
sample({
    clock: queryAvailableNetworks,
    target: Api.getNetworksFx
})
sample({
    clock: queryAvailableRpcs,
    target: Api.getRpcsFx
})
sample({
    clock: queryAvailableTokens,
    target: Api.getTokens
})
