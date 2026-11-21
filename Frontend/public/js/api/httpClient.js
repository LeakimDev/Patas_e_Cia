class ApiError extends Error {
  constructor(message, status, detalhes = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.detalhes = detalhes;
  }
}

async function request(url, options = {}) {
  let response;
  try {
    response = await fetch(url, {
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
    });
  } catch {
    throw new ApiError("Falha de conexão. Verifique sua internet e tente novamente.", 0);
  }

  if (!response.ok) {
    let mensagem = `Erro ${response.status}`;
    let detalhes = null;
    try {
      const data = await response.json();
      if (data?.erro) mensagem = data.erro;
      if (data?.detalhes) detalhes = data.detalhes;
    } catch {
    }
    throw new ApiError(mensagem, response.status, detalhes);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const http = {
  get: (url) => request(url),
  post: (url, body) => request(url, { method: "POST", body: JSON.stringify(body) }),
  put: (url, body) => request(url, { method: "PUT", body: JSON.stringify(body) }),
  delete: (url) => request(url, { method: "DELETE" }),
};
