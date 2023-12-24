import { createEffect, createEvent } from "effector";

export const BaseApiUrl = "/api";
export const BaseStaticUrl = "/static";

export type T_ErrorText = {
  error: string;
};

export type T_InfoText = {
  message: string;
};

export type T_NetworkInfo = {
  network_id: number;
  network_name: string;
  short_name: string;
  currency_name: string;
  currency_symbol: string;
  decimals: number;
};

export type T_NetworkFullInfo = {
  basic_info: T_NetworkInfo;
  explorers: T_BlockExplorerUrl[];
  rpcs: T_RpcUrl[];
};

export type T_Networks = {
  networks: Array<T_NetworkFullInfo>;
};

export type T_Localization = {};

export type T_RpcUrl = {
  id: number;
  network_id: number;
  url: string;
};

export type T_Rpcs = {
  rpcs: Array<T_RpcUrl>;
};

export type T_NFTMarket = {
  nfts: Array<T_NFT_MarketResponse>;
};

export type T_Lider = Array<T_LeaderBoardResponse>;

export type T_Market = Array<T_LeaderBoardResponse>;

export type T_BlockExplorerUrl = {
  id: number;
  network_id: number;
  url: string;
};

export type T_BlockExplorers = {
  explorers: Array<T_BlockExplorerUrl>;
};

export type T_Token = {
  id: number;
  network_id: number;
  name: string;
  icon: string;
  contract_address: string;
};

export type T_Tokens = {
  tokens: Array<T_Token>;
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

export type T_LeaderBoardResponse = {
  nickname: string;
  player: string;
  total: number;
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

export type T_Card = {
  number: number;
  suit: number;
};
export type T_BetInfo = {
  id: number;
  transaction_hash: string;
  player: string;
  player_nickname: string;
  timestamp: number;
  game_id: number;
  game_name: string;
  wager: bigint;
  token_address: string;
  token_name: string;
  network_id: number;
  bets: number;
  multiplier: number;
  profit: bigint;
  player_hand: T_Card[] | null;
};

export type T_Bets = {
  bets: T_BetInfo[];
};

export type T_GameAbi = {
  signature: string;
  types: string;
  names: string;
};

export type T_Totals = {
  bets_amount: number;
  player_amount: number;
  sum: number;
};

export type T_NFT_MarketResponse = {
  id: number;
};

export type T_ApiResponse = {
  status: string;
  body:
    | T_ErrorText
    | T_Networks
    | T_Rpcs
    | T_Token
    | T_Game
    | T_Nickname
    | T_Player
    | T_Bets
    | T_Tokens
    | T_GameAbi
    | T_BlockExplorers
    | T_Totals
    | T_LatestGames
    | T_PlayerTotals
    | T_TokenPrice
    | T_NFTMarket;
};

export type T_GetUsername = {
  address: string;
};

export type T_GetLeaderBoard = {
  return: string;
  time: string;
};

export type T_SetUsername = {
  address: string;
  nickname: string;
  signature: string;
};

export type T_LatestGames = {
  games: string[];
};

export type T_PlayerTotals = {
  bets_amount: number;
  total_wagered_sum: number | null;
  won_bets: number | null;
  lost_bets: number | null;
  highest_win: number | null;
  gross_profit: number | null;
  net_profit: number | null;
};

export type T_TokenPrice = {
  token_price: number;
};

export type T_OpenseaData = {
  listings: any[];
  next: string;
};

export type TypeLeadboardApi =
  | "Daily_volume"
  | "Weekly_volume"
  | "Monthly_volume"
  | "All Time_volume"
  | "Daily_profit"
  | "Weekly_profit"
  | "Monthly_profit"
  | "All Time_profit";
export const TypeLeadboardApi = [
  "Daily_volume",
  "Weekly_volume",
  "Monthly_volume",
  "All Time_volume",
  "Daily_profit",
  "Weekly_profit",
  "Monthly_profit",
  "All Time_profit",
] as const;

export const setUsernameFx = createEffect<T_SetUsername, T_ApiResponse, string>(
  async (form) => {
    return fetch(`${BaseApiUrl}/player/nickname/set`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);

export type T_ConnectWallet = {
  partner_wallet: string;
  signature: string;
  site_id: number;
  sub_id: number;
  user_wallet: string;
};
export const connectWalletPartner = createEffect<
  T_ConnectWallet,
  T_ApiResponse,
  string
>(async (form) => {
  return fetch(`${BaseApiUrl}/partner/site/subid/connect`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })
    .then(async (res) => await res.json())
    .catch((e) => e);
});

export type T_CreateReferal = {
  refer_to: string;
  referal: string;
  signature: string;
};

export const createReferealFx = createEffect<
  T_CreateReferal,
  T_ApiResponse,
  string
>(async (form) => {
  return fetch(`${BaseApiUrl}/player/referal/subscribe`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })
    .then(async (res) => await res.json())
    .catch((e) => e);
});

export type T_SubmitError = {
  data: string;
};

export const submitErrorFX = createEffect<T_SubmitError, T_ApiResponse, string>(
  async (form) => {
    return fetch(`${BaseApiUrl}/general/error`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);

//?-----------------

export const getDataFromOpensea = createEffect<string, any, string>(
  async (next) => {
    return fetch(
      `https://api.opensea.io/api/v2/listings/collection/greekkeepers/all`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-api-key": "a48ba3aa9843421a922596fe4fdb682e",
        },
      }
    )
      .then(async (res) => await res.json())
      .catch((e) => {});
  }
);

//?-----------------

export const getLocalizationFx = createEffect<string, T_Localization, string>(
  async (language) => {
    return fetch(`${BaseStaticUrl}/localizations/${language}.json`, {
      method: "GET",
    })
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);

export const getUsernameFx = createEffect<T_GetUsername, T_ApiResponse, string>(
  async (form) => {
    return fetch(`${BaseApiUrl}/player/nickname/get/${form.address}`, {
      method: "GET",
    })
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);

export const getNetworksFx = createEffect<void, T_ApiResponse, string>(
  async (_) => {
    return fetch(`${BaseApiUrl}/network/list`, {
      method: "GET",
    })
      .then(async (res) => await res.json())
      .catch((e) => {});
  }
);

export const getLeaderboard = createEffect<
  T_GetLeaderBoard,
  T_ApiResponse,
  string
>(async (form) => {
  return fetch(
    `${BaseApiUrl}/general/leaderboard/${form?.return}/${form?.time}`,
    {
      method: "GET",
    }
  )
    .then(async (res) => await res.json())
    .catch((e) => {});
});

export type T_GetRpcs = {
  network_id: number;
};

export const getRpcsFx = createEffect<T_GetRpcs, T_ApiResponse, string>(
  async (form) => {
    return fetch(`${BaseApiUrl}/rpc/get/${form.network_id}`, {
      method: "GET",
    })
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);

export type T_GetTokens = {
  network_id: number;
};

export const getTokens = createEffect<T_GetTokens, T_ApiResponse, string>(
  async (form) => {
    return fetch(`${BaseApiUrl}/token/get/${form.network_id}`, {
      method: "GET",
    })
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);

export type T_GetGame = {
  network_id: number;
  game_name: string;
};

export const getGame = createEffect<T_GetGame, T_ApiResponse, string>(
  async (form) => {
    return fetch(
      `${BaseApiUrl}/game/get/${form.network_id}/${form.game_name}`,
      {
        method: "GET",
      }
    )
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);

export type T_GetAbi = {
  signature: string;
};

export const getAbi = createEffect<T_GetAbi, T_ApiResponse, string>(
  async (form) => {
    return fetch(`${BaseApiUrl}/abi/get/${form.signature}`, {
      method: "GET",
    })
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);

export const getAllExplorers = createEffect<void, T_ApiResponse, string>(
  async (form) => {
    return fetch(`${BaseApiUrl}/block_epxlorer/list`, {
      method: "GET",
    })
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);

export const getAllLastBets = createEffect<void, T_ApiResponse, string>(
  async (form) => {
    return fetch(`${BaseApiUrl}/bets/list`, {
      method: "GET",
    })
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);

export const getGamesAllLastBets = createEffect<string, T_ApiResponse, string>(
  async (game_name) => {
    return fetch(`${BaseApiUrl}/bets/game/${game_name}`, {
      method: "GET",
    })
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);

export type T_GetUserBets = {
  address: string;
  starting_id: number | null;
};

export const getUserBets = createEffect<T_GetUserBets, T_ApiResponse, string>(
  async (form) => {
    return fetch(
      `${BaseApiUrl}/bets/player/${form.address}/${
        form.starting_id != null ? form.starting_id : ""
      }`,
      {
        method: "GET",
      }
    )
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);

export const getUserBetsInc = createEffect<
  T_GetUserBets,
  T_ApiResponse,
  string
>(async (form) => {
  return fetch(
    `${BaseApiUrl}/bets/player/inc/${form.address}/${
      form.starting_id != null ? form.starting_id : ""
    }`,
    {
      method: "GET",
    }
  )
    .then(async (res) => await res.json())
    .catch((e) => e);
});

export const GetGameById = createEffect<number, T_ApiResponse, string>(
  async (game_id) => {
    return fetch(`${BaseApiUrl}/game/get/${game_id}`, {
      method: "GET",
    })
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);
export const GetNftMarket = createEffect<number, T_ApiResponse, string>(
  async (id) => {
    return fetch(
      // `https://game.greekkeepers.io/nft/metadata/${form.lvl}/${form.id}.json`,
      `https://game.greekkeepers.io/nft/metadata/${id}.json`,
      {
        method: "GET",
      }
    )
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);

export const GetTotalsFx = createEffect<void, T_ApiResponse, string>(
  async (_) => {
    return fetch(`${BaseApiUrl}/general/totals`, {
      method: "GET",
    })
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);

export const GetLatestGamesFx = createEffect<string, T_ApiResponse, string>(
  async (address) => {
    return fetch(`${BaseApiUrl}/player/latest_games/${address}`, {
      method: "GET",
    })
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);

export const GetPlayerTotalsFx = createEffect<string, T_ApiResponse, string>(
  async (address) => {
    return fetch(`${BaseApiUrl}/player/totals/${address}`, {
      method: "GET",
    })
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);

export const GetTokenPriceFx = createEffect<string, T_ApiResponse, string>(
  async (token_name) => {
    return fetch(`${BaseApiUrl}/token/price/${token_name.toUpperCase()}`, {
      method: "GET",
    })
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);
