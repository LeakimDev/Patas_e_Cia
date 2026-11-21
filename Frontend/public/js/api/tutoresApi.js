import { http } from "./httpClient.js";

const BASE = "/api/tutores";

export const tutoresApi = {
  listar: () => http.get(BASE),
  buscar: (id) => http.get(`${BASE}/${id}`),
  criar: (dados) => http.post(BASE, dados),
  atualizar: (id, dados) => http.put(`${BASE}/${id}`, dados),
  excluir: (id) => http.delete(`${BASE}/${id}`),
};
