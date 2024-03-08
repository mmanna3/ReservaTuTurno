import { Client } from "./clients";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const api = new Client(API_BASE_URL);
