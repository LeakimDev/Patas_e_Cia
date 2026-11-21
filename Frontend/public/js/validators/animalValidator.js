function hojeIso() {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mes}-${dia}`;
}

export function validarAnimal(dados) {
  const erros = {};

  if (!dados.nome?.trim()) {
    erros.nome = "Nome é obrigatório.";
  }

  if (!dados.especie?.trim()) {
    erros.especie = "Espécie é obrigatória.";
  }

  if (dados.data_nascimento && dados.data_nascimento > hojeIso()) {
    erros.data_nascimento = "A data de nascimento não pode ser no futuro.";
  }

  return { valido: Object.keys(erros).length === 0, erros };
}
