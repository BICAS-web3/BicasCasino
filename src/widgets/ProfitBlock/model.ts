import { createEffect, createEvent, createStore, sample } from "effector";
import * as api from "@/shared/api";

// variables
export const $coefficient = createStore<number>(0);

// events
export const setCoefficient = createEvent<number>();

// handlers
$coefficient.on(setCoefficient, (_, value) => value);
