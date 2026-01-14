import PizZip from "pizzip"
import Docxtemplater from "docxtemplater"

export async function gerarReciboDocx(dados) {
  const response = await fetch("/recibo_minimo.docx")
  const arrayBuffer = await response.arrayBuffer()
  const zip = new PizZip(arrayBuffer)
  const doc = new Docxtemplater(zip)

  doc.render({
    NOME_AQUI: dados.LOCADOR_NOME,
    VALOR_AQUI: dados.TOTAL,
    DATA_AQUI: dados.DATA
  })

  const out = doc.getZip().generate({
    type: "blob",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  })

  const link = document.createElement("a")
  link.href = URL.createObjectURL(out)
  link.download = "recibo.docx"
  link.click()
}
