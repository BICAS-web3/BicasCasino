import { createEvent, createStore } from "effector";

export type ManualType = "MANUAL" | "AUTO";
export type WinningType = "YES" | "NO" | "X5";

export const $isPlaying = createStore<boolean>(false);
export const $manualSetting = createStore<ManualType>("MANUAL");
export const $stopWinning = createStore<WinningType>("YES");

export const setIsPlaying = createEvent<boolean>();
export const setManualSetting = createEvent<ManualType>();
export const setStopWinning = createEvent<WinningType>();

$isPlaying.on(setIsPlaying, (_, state) => state);
$manualSetting.on(setManualSetting, (_, state) => state);
$stopWinning.on(setStopWinning, (_, state) => state);
