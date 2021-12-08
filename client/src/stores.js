import { writable, readable } from 'svelte/store';
import { io } from "socket.io-client";

export const Socket = readable(io());

export const started = writable(false);
export const player_count = writable(0);
export const game = writable();

