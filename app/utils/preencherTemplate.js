export function preencherTemplate(template, dados) {
  let resultado = template;

  for (const chave in dados) {
    const regex = new RegExp(`{{\\s*${chave}\\s*}}`, "g");
    resultado = resultado.replace(regex, dados[chave] || "");
  }

  return resultado;
}
