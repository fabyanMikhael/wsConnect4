import { writable, readable } from 'svelte/store';
import { io } from "socket.io-client";

export const Socket = readable(io(`ws://${window.location.host}`));

export const started = writable(false);
export const game = writable();

