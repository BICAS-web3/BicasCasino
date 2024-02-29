import { createEffect, createEvent, createStore, sample } from "effector";
import * as Api from "@/shared/api";

export const $RollValue = createStore<number>(50);

export const setRollValue = createEvent<number>();

//export const flipRollUnder = createEvent<number>();

// handlers
$RollValue.on(setRollValue, (_, value) => value);
