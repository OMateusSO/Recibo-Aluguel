import { readFile } from "fs/promises";
import { resolve } from "path";

export default defineEventHandler(async () => {
  const path = resolve(process.cwd(), "../automatizacao/templates/declaracao.txt");
  const conteudo = await readFile(path, "utf-8");
  return { template: conteudo };
});
