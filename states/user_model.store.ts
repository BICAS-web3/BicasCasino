import { createEvent, createStore } from 'effector'

export const $startConnect = createStore<boolean>(false)

export const setConnect = createEvent<boolean>()

export const $socketAuth = createStore<boolean>(false)

export const $socketLogged = createStore<boolean>(false)

export const $socketReset = createStore<number>(0)

$startConnect.on(setConnect, (_, state) => state)

export const $isPartner = createStore<boolean>(false)

export const setIsPartner = createEvent<boolean>()

export const setSocketAuth = createEvent<boolean>()

export const setSocketLogged = createEvent<boolean>()

export const setSocketReset = createEvent()

export type UserType = {
  type: string
  id: number
  registration_time: number
  username: string
}

export const $userInfo = createStore<UserType | null>(null)

export const setUserInfo = createEvent<UserType>()

$isPartner.on(setIsPartner, (_, state) => state)

$userInfo.on(setUserInfo, (_, state) => state)

$socketAuth.on(setSocketAuth, (_, state) => state)

$socketLogged.on(setSocketLogged, (_, state) => state)

$socketReset.on(setSocketReset, state => state + 1)
export const $isDrax = createStore<boolean>(false)
export const $balance = createStore<number>(0)
export const $balanceTotal = createStore<any>(null)
export const $showAllBets = createStore<boolean>(true)
export const $showNotification = createStore<boolean>(true)

export const setIsDrax = createEvent<boolean>()
export const setBalance = createEvent<number>()
export const setBalanceTotal = createEvent<number>()
export const setShowNotification = createEvent<boolean>()
export const setShowAllBets = createEvent<boolean>()

$isDrax.on(setIsDrax, (_, state) => state)
$balance.on(setBalance, (_, state) => state)
$showAllBets.on(setShowAllBets, (_, state) => state)
$showNotification.on(setShowNotification, (_, state) => state)
