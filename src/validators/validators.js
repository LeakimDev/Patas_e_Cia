//pequenas funções de validação de dados, usadas no service e no controller.

function textoPreenchido(valor) {
  return typeof valor === "string" && valor.trim().length > 0;
}

function somenteDigitos(valor) {
  return String(valor ?? "").replace(/\D/g, "");
}

function telefoneValido(valor) {
  const digitos = somenteDigitos(valor);
  if (!/^[1-9][1-9]\d{8,9}$/.test(digitos)) return false;
  if (digitos.length === 11 && digitos[2] !== "9") return false;
  return true;
}

function formatarTelefone(valor) {
  const d = somenteDigitos(valor);
  if (d.length === 11)
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10)
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return valor;
}

function emailValido(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

function dataNascimentoValida(valor) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(valor)) return false;
  const [ano, mes, dia] = valor.split("-").map(Number);
  const data = new Date(Date.UTC(ano, mes - 1, dia));
  const existeNoCalendario =
    data.getUTCFullYear() === ano &&
    data.getUTCMonth() === mes - 1 &&
    data.getUTCDate() === dia;
  return existeNoCalendario && data <= new Date();
}

module.exports = {
  textoPreenchido,
  somenteDigitos,
  telefoneValido,
  formatarTelefone,
  emailValido,
  dataNascimentoValida,
};
