import { writable, readable } from 'svelte/store';
import { io } from "socket.io-client";

export const Socket = readable(io("http://127.0.0.1:8080"));



export const started = writable(false);
export const game = writable();

