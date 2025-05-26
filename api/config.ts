import { API_KEY, API_URL } from "@env";

import axios from "axios";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});
