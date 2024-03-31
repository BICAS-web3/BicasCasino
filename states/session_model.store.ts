import { createEffect, createEvent, createStore, sample } from 'effector'
import * as Api from '@/api'

// variables
export const $currentPage = createStore<string>('')
export const $currentWalletAddress = createStore<string | null>(null)
export const $currentNickname = createStore<string | null>(null)
export const $currentNetwork = createStore<Api.T_NetworkInfo | null>(null)
export const $currentToken = createStore<Api.T_Token | null>(null)
export const $currentTokenDecimals = createStore<number>(0)
export const $availableAmount = createStore<number>(0)
export const $newBet = createStore<Api.T_BetInfo | null>(null)

export const $currentBalance = createStore<number | null>(null)
export const $currentAllowance = createStore<number | null>(null)
export const $gameAddress = createStore<string | null>(null)

// events
export const setCurrentPage = createEvent<string>()
export const logIn = createEvent<{ address: string }>()
export const logOut = createEvent()
export const pickNetwork = createEvent<Api.T_NetworkInfo | null>()
export const setCurrentWalletAddress = createEvent<string | null>()
export const setCurrentNickname = createEvent<string | null>()
export const pickToken = createEvent<Api.T_Token | null>()
export const setDecimals = createEvent<number>()
export const setAvailableAmount = createEvent<number>()
export const setNewBet = createEvent<Api.T_BetInfo>()

export const setBalance = createEvent<number | null>()
export const setAllowance = createEvent<number | null>()
export const setGameAddress = createEvent<string | null>()

// handlers
$currentBalance.on(setBalance, (_, balance) => balance)
$currentAllowance.on(setAllowance, (_, allowance) => allowance)
$gameAddress.on(setGameAddress, (_, address) => address)

$currentPage.on(setCurrentPage, (_, current_page) => current_page)

$currentNetwork.on(pickNetwork, (_, picked_network) => picked_network)

$currentToken.on(pickToken, (_, token) => token)

$currentWalletAddress
  .on(logIn, (_, payload) => payload.address)
  .on(logOut, (_, __) => null)

$currentNickname
  .on(Api.getUsernameFx.doneData, (_, payload) => {
    return (payload.body as Api.T_Nickname).nickname
  })
  .on(logOut, (_, __) => null)
  .on(setCurrentNickname, (_, nickname) => nickname)

$availableAmount.on(setAvailableAmount, (_, amount) => amount)

$currentTokenDecimals.on(setDecimals, (_, decimals) => decimals)

$newBet.on(setNewBet, (_, bet) => bet)

// logic
sample({
  clock: logIn,
  target: Api.getUsernameFx
})
