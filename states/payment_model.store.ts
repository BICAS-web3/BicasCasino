import { createEvent, createStore } from 'effector'

type StatusProps = 'waiting' | 'detected' | 'success'

export const $paymentVisibility = createStore<boolean>(true)
export const $totalVisibility = createStore<boolean>(false)
export const $purchaseVisibility = createStore<boolean>(false)
export const $redeemConfirm = createStore<boolean>(false)
export const $isBillline = createStore<boolean>(false)

export const $status = createStore<StatusProps>('waiting')
export const $purchase = createStore<number>(0)
export const $bonus = createStore<number>(0)

export const setPurchase = createEvent<number>()
export const setBonus = createEvent<number>()
export const setPaymentVisibility = createEvent<boolean>()
export const setPurcahseVisibility = createEvent<boolean>()
export const setTotalVisibility = createEvent<boolean>()
export const setRedeemConfirm = createEvent<boolean>()
export const setStatus = createEvent<string>()
export const setIsBillline = createEvent<boolean>()

$redeemConfirm.on(setRedeemConfirm, (_, state) => state)
$paymentVisibility.on(setPaymentVisibility, (_, state) => state)
$totalVisibility.on(setTotalVisibility, (_, state) => state)
$purchaseVisibility.on(setPurcahseVisibility, (_, state) => state)
$status.on(setStatus, (_, state: StatusProps) => state)
$purchase.on(setPurchase, (_, state) => state)
$bonus.on(setBonus, (_, state) => state)
$isBillline.on(setIsBillline, (_, state) => state)
export const $securityModalVisibility = createStore<boolean>(false)

export const setSecurityModalVisibility = createEvent<boolean>()

$securityModalVisibility.on(setSecurityModalVisibility, (_, state) => state)
