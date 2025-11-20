import axios from "axios";
const API = import.meta.env.BASE_URL

export const client = axios.create({
  baseURL:API
})