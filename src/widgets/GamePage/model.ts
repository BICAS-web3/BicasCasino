import { createEffect, createEvent, createStore, sample } from 'effector';


// variables
export const $playSounds = createStore<boolean>(true);


// events
export const switchSounds = createEvent<void>();

// handlers
$playSounds.on(switchSounds, (old, _) => !old)