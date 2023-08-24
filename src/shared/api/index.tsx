import { createEffect, createEvent } from 'effector';

const BaseApiUrl = '/api';

export type T_ErrorText = {
    error: string
};

export type T_InfoText = {
    message: string
};

export type T_NetworkInfo = {
    network_id: number;
    network_name: string;
    short_name: string;
    currency_name: string;
    currency_symbol: string;
    decimals: number;
};

export type T_Networks = {
    networks: Array<T_NetworkInfo>
};

export type T_RpcUrl = {
    id: number;
    network_id: number;
    url: string
};

export type T_Rpcs = {
    rpcs: Array<T_RpcUrl>
};

export type T_BlockExplorerUrl = {
    id: number;
    network_id: number;
    url: string
};

export type T_BlockExplorers = {
    explorers: Array<T_BlockExplorerUrl>
};

export type T_Token = {
    id: number;
    network_id: number;
    name: string;
    icon: string;
    contract_address: string;
}

export type T_Tokens = {
    tokens: Array<T_Token>
};

export type T_Game = {
    id: number;
    network_id: number;
    name: string;
    address: string;
    result_event_signature: string;
};

export type T_Nickname = {
    id: number;
    address: string;
    nickname: string;
};

export type T_Player = {
    id: number;
    address: string;
    wagered: number;
    bets: number;
    bets_won: number;
    bets_lost: number;
    highest_win: number;
    highest_multiplier: number;
};

export type T_Bet = {
    id: number;
    transaction_hash: string;
    player: string;
    timestamp: number;
    game_id: number;
    wager: number;
    token_address: string;
    network_id: number;
    bets: number;
    multiplier: number;
    profit: number;
};

export type T_BetInfo = {
    id: number;
    transaction_hash: string;
    player: string;
    player_nickname: string;
    timestamp: number;
    game_id: number;
    game_name: string;
    wager: number;
    token_address: string;
    token_name: string;
    network_id: number;
    bets: number;
    multiplier: number;
    profit: number;
};

export type T_Bets = {
    bets: Array<T_BetInfo>
};

export type T_GameAbi = {
    signature: string,
    types: string,
    names: string,
}

export type T_ApiResponse = {
    status: string,
    body: T_ErrorText | T_Networks | T_Rpcs | T_Token | T_Game | T_Nickname | T_Player | T_Bets | T_Tokens | T_GameAbi | T_BlockExplorers
};

export type T_GetUsername = {
    address: string
};

export const getUsernameFx = createEffect<T_GetUsername, T_ApiResponse, string>(
    async form => {
        return fetch(`${BaseApiUrl}/get_nickname/${form.address}`, {
            method: 'GET',
        }).then(async res => await res.json()).catch(e => (e));
    }
);

export const getNetworksFx = createEffect<void, T_ApiResponse, string>(
    async _ => {
        return fetch(`${BaseApiUrl}/get_networks`, {
            method: 'GET'
        }).then(async res => await res.json()).catch(e => (e));
    }
);

export type T_GetRpcs = {
    network_id: number
};

export const getRpcsFx = createEffect<T_GetRpcs, T_ApiResponse, string>(
    async form => {
        return fetch(`${BaseApiUrl}/get_rpcs/${form.network_id}`, {
            method: 'GET'
        }).then(async res => await res.json()).catch(e => (e));
    }
);

export type T_GetTokens = {
    network_id: number
};

export const getTokens = createEffect<T_GetTokens, T_ApiResponse, string>(
    async form => {
        return fetch(`${BaseApiUrl}/get_tokens/${form.network_id}`, {
            method: 'GET'
        }).then(async res => await res.json()).catch(e => (e));
    }
)

export type T_GetGame = {
    network_id: number,
    game_name: string
}

export const getGame = createEffect<T_GetGame, T_ApiResponse, string>(
    async form => {
        return fetch(`${BaseApiUrl}/get_game/${form.network_id}/${form.game_name}`, {
            method: 'GET'
        }).then(async res => await res.json()).catch(e => (e));
    }
)

export type T_GetAbi = {
    signature: string
}

export const getAbi = createEffect<T_GetAbi, T_ApiResponse, string>(
    async form => {
        return fetch(`${BaseApiUrl}/get_abi/${form.signature}`, {
            method: 'GET'
        }).then(async res => await res.json()).catch(e => (e));
    }
)

export const getAllExplorers = createEffect<void, T_ApiResponse, string>(
    async form => {
        return fetch(`${BaseApiUrl}/get_all_explorers`, {
            method: 'GET'
        }).then(async res => await res.json()).catch(e => (e));
    }
)

export const getAllLastBets = createEffect<void, T_ApiResponse, string>(
    async form => {
        return fetch(`${BaseApiUrl}/get_all_last_bets`, {
            method: 'GET'
        }).then(async res => await res.json()).catch(e => (e));
    }
)

export const getGamesAllLastBets = createEffect<string, T_ApiResponse, string>(
    async game_name => {
        return fetch(`${BaseApiUrl}/get_game_bets/${game_name}`, {
            method: 'GET'
        }).then(async res => await res.json()).catch(e => (e));
    }
)

export const GetGameById = createEffect<number, T_ApiResponse, string>(
    async game_id => {
        return fetch(`${BaseApiUrl}/get_game/${game_id}`, {
            method: 'GET'
        }).then(async res => await res.json()).catch(e => (e));
    }
)