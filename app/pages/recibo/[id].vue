<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const id = route.params.id ? Number(route.params.id) : null; // se tiver id, editar/visualizar

// ===== CAMPOS =====
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

// ===== TOTAL =====
function toNumber(valor) {
  return Number(String(valor).replace(/\./g, "").replace(",", ".")) || 0;
}
const total = computed(() =>
  toNumber(aluguel.value) +
  toNumber(taxaSeguro.value) +
  toNumber(taxaCondominio.value) +
  toNumber(taxaIPTU.value)
);

// ===== FORMATAR MOEDA =====
function formatarMoeda(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// ===== DATA POR EXTENSO =====
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

// ===== CARREGAR RECIBO EXISTENTE =====
onMounted(() => {
  if (!id) return; // criar novo
  const recibos = JSON.parse(localStorage.getItem("recibos")) || [];
  const r = recibos.find(r => r.id === id);
  if (!r) {
    alert("Recibo não encontrado");
    router.push("/recibos");
    return;
  }

  // preencher campos com dados antigos
  locador.value = r.locador;
  rgLocador.value = r.rgLocador;
  cpfLocador.value = r.cpfLocador;
  locatario.value = r.locatario;
  profissaoLocatario.value = r.profissaoLocatario;
  rgLocatario.value = r.rgLocatario;
  cpfLocatario.value = r.cpfLocatario;
  aluguel.value = r.aluguel;
  taxaSeguro.value = r.taxaSeguro;
  taxaCondominio.value = r.taxaCondominio;
  taxaIPTU.value = r.taxaIPTU;
  numeroApartamento.value = r.numeroApartamento;
  endereco.value = r.endereco;
  bairro.value = r.bairro;
  cidade.value = r.cidade;
  estado.value = r.estado;
  cep.value = r.cep;
  data.value = r.data;
  dataExtenso.value = r.dataExtenso;
});

// ===== SALVAR / ATUALIZAR =====
function salvarRecibo() {
  const recibo = {
    id: id ?? Date.now(),
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

  const recibosSalvos = JSON.parse(localStorage.getItem("recibos")) || [];
  const index = recibosSalvos.findIndex(r => r.id === recibo.id);

  if (index >= 0) {
    recibosSalvos[index] = recibo; // atualizar
  } else {
    recibosSalvos.push(recibo); // novo
  }

  localStorage.setItem("recibos", JSON.stringify(recibosSalvos));

  // ✅ Depois de salvar, volta para a lista de recibos
  router.push("/");
}


// ===== PDF =====
function baixarPDF() {
  salvarRecibo();
  window.print();
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

      <div class="botoes">
        <!-- Botão Salvar / Atualizar -->
        <button class="salvar" @click="salvarRecibo">
          {{ id ? "Atualizar Recibo" : "Salvar Recibo" }}
        </button>

        <!-- Botão Imprimir -->
        <button class="imprimir" @click=baixarPDF>
          Imprimir
        </button>
      </div>
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
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.negrito {
  font-weight: bold;
}

.form input {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
}

/* BOTOES */
.botoes {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}

.botoes button {
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  color: white;
}

.botoes button.salvar {
  background: #4f46e5;
}
.botoes button.salvar:hover {
  background: #4338ca;
}

.botoes button.imprimir {
  background: #10b981;
}
.botoes button.imprimir:hover {
  background: #059669;
}

/* PAGINA */
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

/* PRINT */
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
