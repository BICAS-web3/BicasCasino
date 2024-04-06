import { createEvent, createStore } from 'effector'

export const $paymentVisibility = createStore<boolean>(true)
export const $totalVisibility = createStore<boolean>(false)
export const $purchaseVisibility = createStore<boolean>(false)
export const $storeType = createStore<string>('buy')
export const $copied = createStore<boolean>(false)
export const $purchase = createStore<number>(0)
export const $bonus = createStore<number>(0)

export const setPurchase = createEvent<number>()
export const setBonus = createEvent<number>()
export const setPaymentVisibility = createEvent<boolean>()
export const setPurcahseVisibility = createEvent<boolean>()
export const setTotalVisibility = createEvent<boolean>()
export const setStoreType = createEvent<string>()
export const setCopied = createEvent<boolean>()

$paymentVisibility.on(setPaymentVisibility, (_, state) => state)
$totalVisibility.on(setTotalVisibility, (_, state) => state)
$purchaseVisibility.on(setPurcahseVisibility, (_, state) => state)
$copied.on(setCopied, (_, state) => state)
$storeType.on(setStoreType, (_, state) => state)

$purchase.on(setPurchase, (_, state) => state)
$bonus.on(setBonus, (_, state) => state)
