import { createEvent, createStore } from "effector";

export type ManualType = "MANUAL" | "AUTO";
export type WinningType = "YES" | "NO" | "X5";

export const $manualSetting = createStore<ManualType>("MANUAL");
export const $stopWinning = createStore<WinningType>("NO");
export const $selectedLength = createStore<number>(0);

export const setManualSetting = createEvent<ManualType>();
export const setStopWinning = createEvent<WinningType>();
export const setSelectedLength = createEvent<number>();

$manualSetting.on(setManualSetting, (_, state) => state);
$stopWinning.on(setStopWinning, (_, state) => state);
$selectedLength.on(setSelectedLength, (_, state) => state);
