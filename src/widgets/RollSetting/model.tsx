import { createEffect, createEvent, createStore, sample } from "effector";
import * as Api from "@/shared/api";

// variables
export const $RollValue = createStore<number>(50.5);
export const $RollOver = createStore<boolean>(true);
//export const $RollUnder = createStore<boolean>(false);

// events
export const setRollValue = createEvent<number>();
export const setRollOver = createEvent<boolean>();
export const setRollUnder = createEvent<boolean>();
export const flipRollOver = createEvent<number>();
//export const flipRollUnder = createEvent<number>();

// handlers
$RollValue.on(setRollValue, (_, value) => value);
$RollOver
  //.on(setRollOver, (_, rollOver) => rollOver)
  .on(flipRollOver, (old_value, old_roll_value) => {
    const new_val = 100 - old_roll_value;
    if (new_val < 0.1) {
      setRollValue(0.1);
    } else {
      setRollValue(new_val);
    }
    return (!old_value);
  });
