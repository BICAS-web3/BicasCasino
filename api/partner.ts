import { createEffect } from 'effector'
import { BaseApiUrl, BaseStaticUrl } from '.'

export enum Level {
  firstMonth = 'firstMonth',
  novice = 'novice',
  beginner = 'beginner',
  intermediate = 'intermediate',
  advanced = 'advanced',
  pro = 'pro',
  god = 'god'
}

export interface ILevelPercentages {
  firstMonth: number
  novice: number
  beginner: number
  intermediate: number
  advanced: number
  pro: number
  god: number
  [key: string]: any
}

export const LevelPercentages: ILevelPercentages = {
  firstMonth: 0.55,
  novice: 0.6,
  beginner: 0.65,
  intermediate: 0.7,
  advanced: 0.75,
  pro: 0.8,
  god: 0.85
}

export type T_Localization = {}
export type T_Networks = {
  networks: Array<T_NetworkFullInfo>
}
export type T_NetworkFullInfo = {
  basic_info: T_NetworkInfo
  explorers: T_BlockExplorerUrl[]
  rpcs: T_RpcUrl[]
}
export type T_NetworkInfo = {
  network_id: number
  network_name: string
  short_name: string
  currency_name: string
  currency_symbol: string
  decimals: number
}
export type T_BlockExplorerUrl = {
  id: number
  network_id: number
  url: string
}
export type T_RpcUrl = {
  id: number
  network_id: number
  url: string
}

export type R_getUser = {
  basic: {
    name: string
    country: string
    traffic_source: string
    users_amount_a_month: number
    main_wallet: string
    program: string
    is_verified: boolean
    registration_time: number
    login: string
  }
  contacts: {
    id: number
    name: string
    url: string
    partner_id: string
  }[]
  sites: []
}

export type T_UserSitesResp = {
  basic: {
    id: number
    internal_id: number
    name: string
    partner_id: string
    url: string
    language: string
  }
  sub_ids: [
    {
      id: number
      internal_id: number
      name: string
      partner_id: string
      site_id: number
      url: string
    }
  ]
}[]

export type T_RegisterPage = {
  // timestamp: number | string;
  // wallet: string;
  // auth: string;
  name: string
  url: string
  bareer: string
  language: string
}

export type T_RegisterSubId = {
  // timestamp: number | string;
  // wallet: string;
  // auth: string;
  name: string
  url: string
  internal_site_id: number
  bareer: string
}

export type T_ClicksResponse = {
  clicks: number
  id: number
  partner_id: string
  sub_id_internal: number
}

export type T_GetSubIdClickResponse = {
  clicks: number
  id: number
  partner_id: string
  sub_id_internal: number
}

export type T_ChartResponse = { connected_wallets: number }
export type T_DepositResponse = { connected_wallets: number }
export type T_RegisteredWallets = {
  address: string
  id: number
  partner_id: string
  sub_id_internal: number
  timestamp: string
}

export type T_TotalsStatsResponse = {
  bets_amount: number
  gross_profi: number
  highest_win: number
  lost_bets: number
  net_profit: number
  total_wagered_sum: number
  won_bets: number
}

enum TimeBoundary {
  Daily = 'daily',
  Weekly = 'weekly',
  Monthly = 'monthly',
  All = 'all'
}

export type T_Withdrawal = {
  id: number
  start_time: number
  token: string
  network: string
  wallet_address: string
  status: string
  partner_id: string
  amount: string
}

export type T_ApiResponse = {
  status: string
  body: // | T_ErrorText
  | T_Networks
    | T_Rpcs
    | R_getUser
    | T_UserSitesResp
    | T_GetSubIdClickResponse
    | T_ClicksResponse
    | T_ChartResponse
    | T_DepositResponse
    | T_RegisteredWallets
    | T_TotalsStatsResponse
    | Array<T_Withdrawal>
  // | T_Token_
  // | T_Game
  // | T_Nickname
  // | T_Player
  // | T_Bets
  // | T_Tokens
  // | T_GameAbi
  // | T_BlockExplorers
  // | T_Totals
  // | T_LatestGames
  // | T_PlayerTotals
  // | T_TokenPrice
  // | T_NFTMarket;
}

export type T_Rpcs = {
  rpcs: Array<T_RpcUrl>
}
export type T_Tokens = {
  tokens: Array<T_Token>
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
export type T_Token = {
  id: number
  network_id: number
  name: string
  icon: string
  contract_address: string
}
export type T_GetRpcs = {
  network_id: number
}
export const getLocalizationFx = createEffect<string, T_Localization, string>(
  async language => {
    return fetch(`${BaseStaticUrl}/localizations/${language}.json`, {
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
      .catch(e => {
        console.log(1, e)
      })
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

export type T_LoginUser = {
  login: string
  password: string
}

export type T_RegisterUser = {
  country: string
  login: string
  main_wallet: string
  name: string
  password: string
  traffic_source: string
  users_amount_a_month: number
  language: string
}

export const loginUser = createEffect<T_LoginUser, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/partner/login`, {
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
    return fetch(`${BaseApiUrl}/partner/register`, {
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

export type T_RegisterContact = {
  bareer: string
  contact: { name: string; url: string }[]
}

export type T_RegisterWallets = {
  timestamp?: number | string
  wallet?: string
  auth?: string
  bareer: string
  period: 'daily' | 'weekly' | 'monthly' | 'all'
}

export type T_RegisterChart = {
  bareer: string
  endTime: number
  step?: number
  startTime: number
}

export type T_PartnerClicks = {
  bareer: string
  startTime: number
  endTime: number
  step: number
}

export type T_Withdraw = {
  bareer: string
  amount: string
  network: string
  token: string
  wallet_address: string
}

export type T_ChangePassword = {
  bareer: string
  new_password: string
  old_password: string
}

export type T_GetWithdrawals = {
  bareer: string
  time_boundary: TimeBoundary
}

export type T_DepositedUsers = {
  bareer: string
  period: 'daily' | 'weekly' | 'monthly' | 'all'
}

export type T_TotalsStats = {
  bareer: string
}

export type T_Players = {
  bareer: string
  address: string
}

export type T_SubmitQuestion = {
  //bareer: string,
  name: string
  email: string
  message: string
}

export type T_WalletsRegistered = {
  timestamp?: number | string
  wallet?: string
  auth?: string
  bareer: string
  period: 'daily' | 'weekly' | 'monthly' | 'all'
}

export const registerContact = createEffect<
  T_RegisterContact,
  T_ApiResponse,
  string
>(async form => {
  return fetch(`${BaseApiUrl}/partner/contacts/add`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${form.bareer}`
    },
    body: JSON.stringify({
      contacts: form.contact.map(el => {
        return { name: el.name, url: el.url }
      })
    })
  })
    .then(async res => await res.json())
    .catch(e => e)
})

//?-------
export type T_GetEserData = {
  bareer: string
}

export type T_GetSiteClicks = {
  bareer: string
  id: number | string
}

export const getUserData = createEffect<T_GetEserData, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/partner/get`, {
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

export const getUserSites = createEffect<T_GetEserData, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/partner/site/get`, {
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

export const registerPage = createEffect<T_RegisterPage, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/partner/site/add`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${form.bareer}`
      },
      body: JSON.stringify({
        url: form.url,
        name: form.name,
        language: form.language
      })
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)

export type T_GetSubIdClicks = {
  bareer: string
  site_id: string
  sub_id: string
}

export const getSubIdClicks = createEffect<
  T_GetSubIdClicks,
  T_ApiResponse,
  string
>(async form => {
  return fetch(
    `${BaseApiUrl}/partner/site/subid/clicks/${form.site_id}/${form.sub_id}`,
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
})

export const getFullClicks = createEffect<T_GetEserData, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/partner/clicks`, {
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

export const getSiteClicks = createEffect<
  T_GetSiteClicks,
  T_ApiResponse,
  string
>(async form => {
  return fetch(`${BaseApiUrl}/partner/site/clicks/${form.id}`, {
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

//?--------------------------------------
//?--------------------------------------
//?--------------------------------------
//?--------------------------------------
//?--------------------------------------
//?--------------------------------------
//?--------------------------------------
export const getUserContact = createEffect<
  T_GetEserData,
  T_ApiResponse,
  string
>(async form => {
  return fetch(`${BaseApiUrl}/partner/contacts/get`, {
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

export const registerSubId = createEffect<
  T_RegisterSubId,
  T_ApiResponse,
  string
>(async form => {
  return fetch(`${BaseApiUrl}/partner/site/subid/add`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${form.bareer}`
    },
    body: JSON.stringify({
      url: form.url,
      name: form.name,
      internal_site_id: form.internal_site_id
    })
  })
    .then(async res => await res.json())
    .catch(e => e)
})

export type T_RegisterSubIdConnect = {
  timestamp: number | string
  bareer: string
  partner_wallet: string
  signature: string
  site_id: number
  sub_id: number
  user_wallet: string
}

export const registerSubIdConnect = createEffect<
  T_RegisterSubIdConnect,
  T_ApiResponse,
  string
>(async form => {
  return fetch(`${BaseApiUrl}/partner/site/subid/connect`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${form.bareer}`
    },
    body: JSON.stringify({
      partner_wallet: form.partner_wallet,
      signature: form.signature,
      site_id: form.site_id,
      sub_id: form.sub_id,
      user_wallet: form.user_wallet
    })
  })
    .then(async res => await res.json())
    .catch(e => e)
})

export const deleteContact = createEffect<T_GetEserData, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/partner/contacts/delete`, {
      method: 'DELETE',
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

export const getUsersRegistration = createEffect<
  T_RegisterWallets,
  T_ApiResponse,
  string
>(async form => {
  return fetch(`${BaseApiUrl}/partner/connected/${form.period}`, {
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

export const getUsersRegistrationChart = createEffect<
  T_RegisterChart,
  T_ApiResponse,
  string
>(async form => {
  return fetch(
    `${BaseApiUrl}/partner/connected/${form.startTime}/${form.endTime}/${form.step}`,
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
})

export const getUsersRegistrationBetChart = createEffect<
  T_RegisterChart,
  T_ApiResponse,
  string
>(async form => {
  return fetch(
    `${BaseApiUrl}/partner/connected_betted/${form.startTime}/${form.endTime}/${form.step}`,
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
})

export const getUsersClicks = createEffect<
  T_PartnerClicks,
  T_ApiResponse,
  string
>(async form => {
  //const startTime = Date.now();

  return fetch(
    `${BaseApiUrl}/partner/clicks/${form.startTime}/${form.endTime}/${form.step}`,
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
})

export const getDepositedUsers = createEffect<
  T_DepositedUsers,
  T_ApiResponse,
  string
>(async form => {
  const startTime = Date.now()
  return fetch(`${BaseApiUrl}/partner/connected_betted/${form.period}`, {
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

export const getConnectedWallets = createEffect<
  T_WalletsRegistered,
  T_ApiResponse,
  string
>(async form => {
  const startTime = Date.now()
  return fetch(`${BaseApiUrl}/partner/wallets/${form.period}`, {
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

export const getTotalsStats = createEffect<
  T_TotalsStats,
  T_ApiResponse,
  string
>(async form => {
  return fetch(`${BaseApiUrl}/partner/connected/totals`, {
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

export const getPlayersData = createEffect<T_Players, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/player/totals/${form.address}`, {
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

export const changePassword = createEffect<
  T_ChangePassword,
  T_ApiResponse,
  string
>(async form => {
  return fetch(`${BaseApiUrl}/partner/change/password`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${form.bareer}`
    },
    body: JSON.stringify({
      new_password: form.new_password,
      old_password: form.old_password
    })
  })
    .then(async res => await res.json())
    .catch(e => e)
})

export const getWithdrawal = createEffect<
  T_GetWithdrawals,
  T_ApiResponse,
  string
>(async form => {
  return fetch(`${BaseApiUrl}/partner/withdrawals/${form.time_boundary}`, {
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

export const submitQuestion = createEffect<
  T_SubmitQuestion,
  T_ApiResponse,
  string
>(async form => {
  return fetch(`${BaseApiUrl}/partner/question`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      //Authorization: `Bearer ${form.bareer}`,
    },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      message: form.message
    })
  })
    .then(async res => await res.json())
    .catch(e => e)
})

export const withdraw = createEffect<T_Withdraw, T_ApiResponse, string>(
  async form => {
    return fetch(`${BaseApiUrl}/partner/withdraw`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${form.bareer}`
      },
      body: JSON.stringify({
        amount: form.amount,
        network: form.network,
        token: 'USDT',
        wallet_address: form.wallet_address
      })
    })
      .then(async res => await res.json())
      .catch(e => e)
  }
)
