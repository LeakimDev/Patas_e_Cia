import { http } from "./httpClient.js";

export const animaisApi = {
  listarPorTutor: (tutorId) => http.get(`/api/tutores/${tutorId}/animais`),
  buscar: (tutorId, id) => http.get(`/api/tutores/${tutorId}/animais/${id}`),
  criar: (tutorId, dados) => http.post(`/api/tutores/${tutorId}/animais`, dados),
  atualizar: (tutorId, id, dados) => http.put(`/api/tutores/${tutorId}/animais/${id}`, dados),
  excluir: (tutorId, id) => http.delete(`/api/tutores/${tutorId}/animais/${id}`),
};
