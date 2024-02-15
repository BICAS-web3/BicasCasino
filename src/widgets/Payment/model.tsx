import { createEvent, createStore } from "effector";

export const $paymentVisibility = createStore<boolean>(true);
export const $purchaseVisibility = createStore<boolean>(false);
export const $storeType = createStore<string>("buy");

export const setPaymentVisibility = createEvent<boolean>();
export const setPurcahseVisibility = createEvent<boolean>();
export const setStoreType = createEvent<string>();

$paymentVisibility.on(setPaymentVisibility, (_, state) => state);
$purchaseVisibility.on(setPurcahseVisibility, (_, state) => state);
$storeType.on(setStoreType, (_, state) => state);
