import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// 🚀 Importa as variáveis de ambiente usando o alias configurado no babel.config.js
import { API_BASE_URL } from "@env";

// ✅ API_BASE_URL é agora importado, não hardcoded!
// export const API_BASE_URL = "http://3.148.16.254:8080/"; // <-- REMOVA ESTA LINHA

const api = axios.create({
  // ✅ Usa a variável importada
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("@token"); 
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;