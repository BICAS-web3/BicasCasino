import { createEvent, createStore } from 'effector';


// variables
export const $BlurActive = createStore<boolean>(false);

// events
export const setBlur = createEvent<boolean>();

// handlers
$BlurActive.on(setBlur, (_, inp) => inp);