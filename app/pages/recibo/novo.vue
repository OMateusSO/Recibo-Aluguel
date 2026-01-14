<script setup>
import { ref, watch, computed } from "vue";

const locador = ref("");
const rgLocador = ref("");
const cpfLocador = ref("");
const locatario = ref("");
const profissaoLocatario = ref("");
const rgLocatario = ref("");
const cpfLocatario = ref("");
const aluguel = ref("");
const taxaSeguro = ref("");
const taxaCondominio = ref("");
const taxaIPTU = ref("");
const numeroApartamento = ref("");
const endereco = ref("");
const bairro = ref("");
const cidade = ref("");
const estado = ref("");
const cep = ref("");
const data = ref("");
const dataExtenso = ref("");

function toNumber(valor) {
  return Number(
    String(valor)
      .replace(/\./g, "")
      .replace(",", ".")
  ) || 0;
}

const total = computed(() => {
  return (
    toNumber(aluguel.value) +
    toNumber(taxaSeguro.value) +
    toNumber(taxaCondominio.value) +
    toNumber(taxaIPTU.value)
  );
});

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}


watch(data, (v) => {
  if (!v) return;

  const [ano, mes, dia] = v.split("-");
  const dataLocal = new Date(ano, mes - 1, dia);

  dataExtenso.value = dataLocal.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
});

function salvarRecibo() {
  const recibo = {
    id: Date.now(), // novo recibo
    locador: locador.value,
    rgLocador: rgLocador.value,
    cpfLocador: cpfLocador.value,
    locatario: locatario.value,
    profissaoLocatario: profissaoLocatario.value,
    rgLocatario: rgLocatario.value,
    cpfLocatario: cpfLocatario.value,
    aluguel: aluguel.value,
    taxaSeguro: taxaSeguro.value,
    taxaCondominio: taxaCondominio.value,
    taxaIPTU: taxaIPTU.value,
    numeroApartamento: numeroApartamento.value,
    endereco: endereco.value,
    bairro: bairro.value,
    cidade: cidade.value,
    estado: estado.value,
    cep: cep.value,
    data: data.value,
    dataExtenso: dataExtenso.value,
    total: total.value,
  };

  // pegar recibos antigos
  const recibosSalvos = JSON.parse(localStorage.getItem("recibos")) || [];

  // salvar novo
  recibosSalvos.push(recibo);

  // salvar no localStorage
  localStorage.setItem("recibos", JSON.stringify(recibosSalvos));

  alert("Recibo salvo com sucesso!");
}


</script>


<template>
  <div class="app">
    <div class="form">
      <h2>Preencha os dados do recibo</h2>

      <input v-model="locador" placeholder="Nome do locador" />
      <input v-model="rgLocador" placeholder="RG do locador" />
      <input v-model="cpfLocador" placeholder="CPF do locador" />
      <input v-model="locatario" placeholder="Nome do locatário" />
      <input v-model="profissaoLocatario" placeholder="Profissão" />
      <input v-model="rgLocatario" placeholder="RG do locatário" />
      <input v-model="cpfLocatario" placeholder="CPF do locatário" />
      <input v-model="aluguel" placeholder="Aluguel" />
      <input v-model="taxaSeguro" placeholder="Taxa seguro fiança" />
      <input v-model="taxaCondominio" placeholder="Taxa de condomínio" />
      <input v-model="taxaIPTU" placeholder="Taxa de IPTU" />
      <input v-model="numeroApartamento" placeholder="Número do apartamento" />
      <input v-model="endereco" placeholder="Endereço" />
      <input v-model="bairro" placeholder="Bairro" />
      <input v-model="cidade" placeholder="Cidade" />
      <input v-model="estado" placeholder="Estado" />
      <input v-model="cep" placeholder="CEP" />

      <input v-model="data" type="date" />

      <button @click="salvarRecibo">
        Salvar Recibo
      </button>

    </div>

    <div ref="pagina" class="pagina">
      <h1>RECIBO DE ALUGUEL</h1>

      <p>
        Eu, <span class="negrito">{{ locador }}</span>, portador(a) do RG <span class="negrito">{{ rgLocador }}</span> e
        inscrito(a) no CPF <span class="negrito">{{ cpfLocador }}</span>, declaro para os devidos fins que recebi de
        <span class="negrito">{{ locatario }}</span>, <span class="negrito">{{ profissaoLocatario }}</span>, portador(a)
        do RG <span class="negrito">{{ rgLocatario }}</span> e inscrito(a) no CPF/CNPJ: <span class="negrito">{{
          cpfLocatario }}</span>, os seguintes valores: Aluguel: R$ <span class="negrito">{{ aluguel }}</span>; Taxa de
        seguro fiança: R$ <span class="negrito">{{ taxaSeguro }}</span>; Taxa de condomínio: R$ <span class="negrito">{{
          taxaCondominio }}</span>; e Taxa de IPTU: R$ <span class="negrito">{{ taxaIPTU }}</span>, totalizando o valor
        de R$ <span class="negrito">{{ formatarMoeda(total) }}</span>, no dia {{ dataExtenso }} referente à locação do
        apartamento de número <span class="negrito">{{ numeroApartamento }}</span>, situado no <span class="negrito">{{
          endereco }}</span>, no bairro <span class="negrito">{{ bairro }}</span>, {{ cidade }}-{{ estado }}, com CEP:
        {{ cep }}.
      </p>

      <p>Vitória, {{ dataExtenso }}.</p>

      <div class="assinatura">
        <div class="linha"></div>
        <p>Assinatura</p>
      </div>
    </div>
  </div>
</template>


<style scoped>
.app {
  display: flex;
  gap: 30px;
  padding: 20px;
  background: #f0f0f0;
}

/* FORM */
.form {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.negrito {
  font-weight: bold;
}


.form input {
  padding: 8px;
}

.form button {
  padding: 10px;
  background: #4f46e5;
  color: white;
  border: none;
  cursor: pointer;
}


.pagina {
  width: 794px;
  min-height: 1123px;
  background: white;
  padding: 80px 70px;
  box-sizing: border-box;
  font-family: "Times New Roman", serif;
  font-size: 14px;
  color: black;
  text-align: justify;
  margin: 0 auto;
}

.pagina h1 {
  text-align: center;
  margin-bottom: 30px;
}

.pagina .assinatura {
  text-align: center;
  margin-top: 120px;
}

.linha {
  border-top: 1px solid black;
  width: 300px;
  margin: 0 auto 5px;
}


@media print {

  body * {
    visibility: hidden;
  }

  .pagina,
  .pagina * {
    visibility: visible;
  }

  .pagina {
    position: absolute;
    left: 0;
    top: 0;

    width: 210mm;
    min-height: 297mm;

    padding: 20mm;
    box-sizing: border-box;
  }

  body {
    background: white;
  }
}

@page {
  size: A4;
  margin: 0;
}
</style>
