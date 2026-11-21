const REGEX_TELEFONE = /^\(\d{2}\)\s9?\d{4}-\d{4}$/;

export function validarTutor(dados) {
  const erros = {};

  if (!dados.nome?.trim()) {
    erros.nome = "Nome é obrigatório.";
  }

  if (!dados.telefone?.trim()) {
    erros.telefone = "Telefone é obrigatório.";
  } else if (!REGEX_TELEFONE.test(dados.telefone.trim())) {
    erros.telefone = "Informe um telefone válido com DDD. Ex: (11) 91234-5678";
  }

  if (dados.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email.trim())) {
    erros.email = "Informe um e-mail válido.";
  }

  return { valido: Object.keys(erros).length === 0, erros };
}
