import axios from "axios";
const API_BASE = import.meta.env.BASE_URL

const api = axios.create({
  baseURL:API_BASE
})
export default api