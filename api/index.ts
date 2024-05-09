import { UserType } from '@/states/user_model.store'
import { createEffect, createEvent } from 'effector'
import { JWT } from 'next-auth/jwt'

export const BaseApiUrl = '/api'
export const BaseStaticUrl = '/static'
export const P2WayUrl = 'https://stage.p2way.fyi'

export type T_ErrorText = {
  error: string
  prices: unknown
}

export type T_InfoText = {
  message: string
}

export type T_NetworkInfo = {
  network_id: number
  network_name: string
  short_name: string
  currency_name: string
  currency_symbol: string
  decimals: number
}

export type T_NetworkFullInfo = {
  basic_info: T_NetworkInfo
  explorers: T_BlockExplorerUrl[]
  rpcs: T_RpcUrl[]
}

export type T_Networks = {
  networks: Array<T_NetworkFullInfo>
  prices: unknown
}

export type T_Localization = {}

export type T_RpcUrl = {
  id: number
  network_id: number
  url: string
}

export type T_Rpcs = {
  rpcs: Array<T_RpcUrl>
  prices: unknown
}

export type T_NFTMarket = {
  prices: unknown
  nfts: Array<T_NFT_MarketResponse>
}

export type T_Lider = Array<T_LeaderBoardResponse>

export type T_Market = Array<T_LeaderBoardResponse>

export type T_BlockExplorerUrl = {
  id: number
  network_id: number
  url: string
}

export type T_BlockExplorers = {
  explorers: Array<T_BlockExplorerUrl>
  prices: unknown
}

export type T_Token = {
  id: number
  prices: unknown
  network_id: number
  name: string
  icon: string
  contract_address: string
}

export type T_Tokens = {
  tokens: Array<T_Token>
  prices: unknown
}

export type T_Game = {
  id: number
  prices: unknown
  network_id: number
  name: string
  address: string
  result_event_signature: string
}

export type T_Nickname = {
  id: number
  prices: unknown
  address: string
  nickname: string
}

export type T_LeaderBoardResponse = {
  user_id: string
  username: string
  total: number
}

export type T_OneTimeToken = {
  bareer: string
}

export type T_Player = {
  id: number
  prices: unknown
  address: string
  wagered: number
  bets: number
  bets_won: number
  bets_lost: number
  highest_win: number
  highest_multiplier: number
}

export type T_Bet = {
  id: number
  transaction_hash: string
  player: string
  timestamp: number
  game_id: number
  wager: number
  token_address: string
  network_id: number
  bets: number
  multiplier: number
  profit: number
}

export type T_Card = {
  number: number
  suit: number
}
export type T_GetQr = {
  bareer: string
  id: number
}

export type T_Header = {
  bareer: string
}
export type T_UserInfo = {
  bareer: string
  id?: string | number
}

export type T_BetInfo = {
  id: number
  timestamp: number
  amount: string
  profit: string
  num_games: number
  outcomes: string
  profits: string
  bet_info: string
  state: string
  uuid: string
  game_id: number
  user_id: number
  username: string
  coin_id: number
  userseed_id: number
  serverseed_id: number
}

export type T_Bets = {
  bets: T_BetInfo[]
  prices: unknown
}

export type T_GameAbi = {
  signature: string
  types: string
  prices: unknown
  names: string
}

export type T_Totals = {
  bets_amount: number
  player_amount: number
  prices: unknown
  sum: number
}

export type T_NFT_MarketResponse = {
  id: number
}

export type T_GetUserAmount = {
  bareer: string
  userId: string | number
}

export type T_ApiResponse = {
  json(): any
  status: string
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
    | T_NFTMarket
    | T_LoginReponse
    | UserType
    | JWT
}

export type T_InvoiceCreate = {
  amount: number
  currency: string
  bareer: string
}

export type T_RefreshToken = {
  refresh_token: string
  bareer: string
}

export type T_LoginReponse = {
  access_token: string
  expires_in: number
  refresh_token: string
  token_type: string
  prices: unknown
}

export type T_GetUsername = {
  address: string
}

export type T_GetLeaderBoard = {
  return: string
  time: string
}

export type T_SetUsername = {
  address: string
  nickname: string
  signature: string
}

export type T_LatestGames = {
  games: string[]
  prices: unknown
}

export type T_PlayerTotals = {
  prices: unknown
  bets_amount: number
  total_wagered_sum: number | null
  won_bets: number | null
  lost_bets: number | null
  highest_win: number | null
  gross_profit: number | null
  net_profit: number | null
}

export type T_TokenPrice = {
  token_price: number
  prices: unknown
}

export type T_OpenseaData = {
  listings: unknown[]
  next: string
}

export type TypeLeadboardApi =
  | 'Daily_volume'
  | 'Weekly_volume'
  | 'Monthly_volume'
  | 'All Time_volume'
  | 'Daily_profit'
  | 'Weekly_profit'
  | 'Monthly_profit'
  | 'All Time_profit'
export const TypeLeadboardApi = [
  'Daily_volume',
  'Weekly_volume',
  'Monthly_volume',
  'All Time_volume',
  'Daily_profit',
  'Weekly_profit',
  'Monthly_profit',
  'All Time_profit'
] as const

export const setUsernameFx = createEffect<T_SetUsername, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/player/nickname/set`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export type T_ConnectWallet = {
  partner_wallet: string
  signature: string
  site_id: number
  sub_id: number
  user_wallet: string
}
export const connectWalletPartner = createEffect<
  T_ConnectWallet,
  T_ApiResponse,
  string
>(async form => {
  return fetch(`${BaseApiUrl}/partner/site/subid/connect`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(async res => await res.json())
    .catch(e => e)
})

export type T_CreateReferal = {
  refer_to: string
  referal: string
  signature: string
}

export const createReferealFx = createEffect<
  T_CreateReferal,
  T_ApiResponse,
  string
>(async form => {
  return fetch(`${BaseApiUrl}/player/referal/subscribe`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(async res => await res.json())
    .catch(e => e)
})

export type T_SubmitError = {
  data: string
}

export type T_RegisterUser = {
  username: string
  password: string
  h_captcha_response: string
}

export type T_LoginUser = {
  login: string
  password: string
}

export type T_ChangeName = {
  name: string
  bareer: string
}

export const submitErrorFX = createEffect<T_SubmitError, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/general/error`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)

//?-----------------

export const getDataFromOpensea = createEffect<string, unknown, string>(
  async next => {
    return fetch(
      `https://api.opensea.io/api/v2/listings/collection/greekkeepers/all`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-api-key': 'a48ba3aa9843421a922596fe4fdb682e'
        }
      }
    )
      .then(async res => await res.json())
      .catch(e => {})
  }
)

//?-----------------

export const getLocalizationFx = createEffect<string, T_Localization, string>(
  async language => {
    return fetch(`${BaseStaticUrl}/localizations/${language}.json`, {
      method: 'GET'
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export const getUsernameFx = createEffect<T_GetUsername, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/player/nickname/get/${form.address}`, {
      method: 'GET'
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export const getNetworksFx = createEffect<void, T_ApiResponse, string>(
  async _ => {
    return fetch(`${BaseApiUrl}/network/list`, {
      method: 'GET'
    })
      .then(async res => await res.json())
      .catch(e => {})
  }
)

export const getLeaderboard = createEffect<
  T_GetLeaderBoard,
  T_ApiResponse,
  string
>(async form => {
  return fetch(
    `${BaseApiUrl}/general/leaderboard/${form?.return}/${form?.time}`,
    {
      method: 'GET'
    }
  )
    .then(async res => await res.json())
    .catch(e => {})
})

export type T_GetRpcs = {
  network_id: number
}

export const getRpcsFx = createEffect<T_GetRpcs, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/rpc/get/${form.network_id}`, {
      method: 'GET'
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export type T_GetTokens = {
  network_id: number
}

export const getTokens = createEffect<T_GetTokens, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/token/get/${form.network_id}`, {
      method: 'GET'
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export type T_GetGame = {
  network_id: number
  game_name: string
}

export const getGame = createEffect<T_GetGame, T_ApiResponse, string>(
  async form => {
    return fetch(
      `${BaseApiUrl}/game/get/${form.network_id}/${form.game_name}`,
      {
        method: 'GET'
      }
    )
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export type T_GetAbi = {
  signature: string
}

export const getAbi = createEffect<T_GetAbi, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/abi/get/${form.signature}`, {
      method: 'GET'
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export const getAllExplorers = createEffect<void, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/block_epxlorer/list`, {
      method: 'GET'
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export const getAllLastBets = createEffect<void, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/bets/list`, {
      method: 'GET'
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export const getGamesAllLastBets = createEffect<string, T_ApiResponse, string>(
  async game_name => {
    return fetch(`${BaseApiUrl}/bets/game/${game_name}`, {
      method: 'GET'
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export type T_GetUserBets = {
  address: string
  starting_id?: number | null
}

export const getUserBets = createEffect<T_GetUserBets, T_ApiResponse, string>(
  async form => {
    return fetch(
      `${BaseApiUrl}/bets/user/${form.address}/${
        form.starting_id != null ? form.starting_id : ''
      }`,
      {
        method: 'GET'
      }
    )
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export const getOneTimeToken = createEffect<
  T_OneTimeToken,
  T_ApiResponse,
  string
>(async form => {
  return fetch(`${BaseApiUrl}/p2way/ott`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${form.bareer}`
    }
  })
    .then(async res => await res.json())
    .catch(e => e)
})

export const getUserBetsInc = createEffect<
  T_GetUserBets,
  T_ApiResponse,
  string
>(async form => {
  return fetch(
    `${BaseApiUrl}/bets/user/inc/${form.address}/${
      form.starting_id != null ? form.starting_id : ''
    }`,
    {
      method: 'GET'
    }
  )
    .then(async res => await res.json())
    .catch(e => e)
})

export const GetGameById = createEffect<number, T_ApiResponse, string>(
  async game_id => {
    return fetch(`${BaseApiUrl}/game/get/${game_id}`, {
      method: 'GET'
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)
export const GetNftMarket = createEffect<number, T_ApiResponse, string>(
  async id => {
    return fetch(
      // `https://game.greekkeepers.io/nft/metadata/${form.lvl}/${form.id}.json`,
      `https://game.greekkeepers.io/nft/metadata/${id}.json`,
      {
        method: 'GET'
      }
    )
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export const GetTotalsFx = createEffect<void, T_ApiResponse, string>(
  async _ => {
    return fetch(`${BaseApiUrl}/general/totals`, {
      method: 'GET'
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export const GetLatestGamesFx = createEffect<string, T_ApiResponse, string>(
  async address => {
    return fetch(`${BaseApiUrl}/player/latest_games/${address}`, {
      method: 'GET'
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export const GetPlayerTotalsFx = createEffect<string, T_ApiResponse, string>(
  async address => {
    return fetch(`${BaseApiUrl}/player/totals/${address}`, {
      method: 'GET'
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export const GetTokenPriceFx = createEffect<string, T_ApiResponse, string>(
  async token_name => {
    return fetch(`${BaseApiUrl}/token/price/${token_name.toUpperCase()}`, {
      method: 'GET'
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export const loginUser = createEffect<T_LoginUser, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/user/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)
export const registerUser = createEffect<T_RegisterUser, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/user/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export const changeName = createEffect<T_ChangeName, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/user/username`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${form.bareer}`
      },
      body: JSON.stringify(form)
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export const getUserInfo = createEffect<T_UserInfo, T_ApiResponse, string>(
  async form => {
    return fetch(
      form.id ? `${BaseApiUrl}/user/${form.id}` : `${BaseApiUrl}/user`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${form.bareer}`
        }
      }
    )
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export const getUserAmounts = createEffect<
  T_GetUserAmount,
  T_ApiResponse,
  string
>(async form => {
  return fetch(`${BaseApiUrl}/user/amounts/${form.userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${form.bareer}`
    }
  })
    .then(async res => await res.json())
    .catch(e => e)
})

export const getInvoiceQr = createEffect<T_GetQr, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/invoice/qr/${form.id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${form.bareer}`
      }
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export const invoiceCreate = createEffect<
  T_InvoiceCreate,
  T_ApiResponse,
  string
>(async form => {
  return fetch(`${BaseApiUrl}/invoice/create`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${form.bareer}`
    },
    body: JSON.stringify({
      amount: form.amount,
      currency: form.currency
    })
  })
    .then(async res => await res.json())
    .catch(e => e)
})
export const getClientSeed = createEffect<T_Header, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/user/seed/client`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${form.bareer}`
      }
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)
export const getServerSeed = createEffect<T_Header, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/user/seed/server`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${form.bareer}`
      }
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export const getGames = createEffect<T_Header, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/game/list`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${form.bareer}`
      }
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export const getInvoicePrices = createEffect<T_Header, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/invoice/prices`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${form.bareer}`
      }
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export const refreshToken = createEffect<T_RefreshToken, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/user/refresh/${form.refresh_token}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${form.bareer}`
      }
      // body: JSON.stringify({
      //   refresh_token: form.refresh_token
      // })
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export const getTokensGeneral = createEffect<T_Header, T_ApiResponse, string>(
  async () => {
    return fetch(`${BaseApiUrl}/general/promtokens`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        // Authorization: `Bearer ${form.bareer}`
      }
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)

interface IBilliane {
  address: string
  amount: string
  city: string
  country: string
  currency: string
  email: string
  first_name: string
  last_name: string
  phone: string
  post_code: string
  region: string
  bareer: string
}

export const getTokensBilliane = createEffect<IBilliane, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/invoice/billine/create`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${form.bareer}`
      },
      body: JSON.stringify({
        address: form.address,
        amount: form.amount,
        city: form.city,
        country: form.country,
        currency: form.currency,
        email: form.email,
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone,
        post_code: form.post_code,
        region: form.region
      })
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)

type T_TokenSettings = {
  apiKey: string
  token: string
}

export const getTokensSettings = createEffect<
  T_TokenSettings,
  T_ApiResponse,
  string
>(async form => {
  return fetch(
    `${P2WayUrl}/widget/getSettings?apiKey=${form.apiKey}&token=${form.token}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
    .then(async res => await res.json())
    .catch(e => e)
})

type T_TokenSession = {
  apiKey: string
  userId: string
  token: string
  callbackUrl: string
}

export const createTokenSession = createEffect<
  T_TokenSession,
  T_ApiResponse,
  string
>(async form => {
  return fetch(`${P2WayUrl}/widget/createSession`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(async res => await res.json())
    .catch(e => e)
})

type T_TokenOrder = {
  sessionId: string
  token: string
  amount: number
}

export const createTokenOrder = createEffect<
  T_TokenOrder,
  T_ApiResponse,
  string
>(async form => {
  return fetch(`${P2WayUrl}/widget/createOrder`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // Authorization: `Bearer ${form.bareer}`
    },
    body: JSON.stringify(form)
  })
    .then(async res => await res.json())
    .catch(e => e)
})

type T_DataOrder = {
  orderId: string
  token: string
}

export const cancelTokenOrder = createEffect<
  T_DataOrder,
  T_ApiResponse,
  string
>(async form => {
  return fetch(`${P2WayUrl}/widget/cancelOrder`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // Authorization: `Bearer ${form.bareer}`
    },
    body: JSON.stringify(form)
  })
    .then(async res => await res.json())
    .catch(e => e)
})

export const confirmOrder = createEffect<T_DataOrder, T_ApiResponse, string>(
  async form => {
    return fetch(`${P2WayUrl}/widget/confirmMoneyTransfer`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        // Authorization: `Bearer ${form.bareer}`
      },
      body: JSON.stringify(form)
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)

type T_ScreenShootOrder = {
  orderId: string
  bucketS3DocumentName: string
}

export const screenShootOrder = createEffect<
  T_ScreenShootOrder,
  T_ApiResponse,
  string
>(async form => {
  return fetch(`${P2WayUrl}/widget/addDocumentToOrder`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // Authorization: `Bearer ${form.bareer}`
    },
    body: JSON.stringify(form)
  })
    .then(async res => await res.json())
    .catch(e => e)
})

export const getOrderInfo = createEffect<
  { orderId: string },
  T_ApiResponse,
  string
>(async form => {
  return fetch(`${P2WayUrl}/widget/getOrderById?orderId=${form.orderId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // Authorization: `Bearer ${form.bareer}`
    }
  })
    .then(async res => await res.json())
    .catch(e => e)
})

export type T_ImageFile = {
  imageName: string
  contentType: string
}

export const getImageFile = createEffect<T_ImageFile, T_ApiResponse, string>(
  async form => {
    return fetch(
      `${P2WayUrl}/uploadFile/getUploadDocumentURL?documentName=${form.imageName}&contentType=${form.contentType}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export type T_BilllineIframe = {
  merchant: string
  order: string
  amount: string
  currency: string
  item_name: string
  first_name: string
  last_name: string
  user_id: string
  payment_url: string
  country: string
  ip: string
  custom: ''
  email: 'test@gmail.com'
  phone: '+35988222763'
  address: 'Avenue Marius Renard 21'
  city: 'Anderlecht'
  post_code: '1070'
  region: 'stuttgart'
  lang: 'en'
}

// export const getBilllineIframe = createEffect<
//   T_BilllineIframe,
//   T_ApiResponse,
//   string
// >(async form => {
//   return fetch(
//     `${P2WayUrl}/uploadFile/getUploadDocumentURL?documentName=${form.imageName}&contentType=${form.contentType}`,
//     {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       }
//     }
//   )
//     .then(async res => await res.json())
//     .catch(e => e)
// })
