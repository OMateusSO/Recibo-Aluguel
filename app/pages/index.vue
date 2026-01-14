<template>
  <div class="container">
    <div class="header">
      <h1>Recibos de Aluguel</h1>
      <button class="novo" @click="novoRecibo">➕ Novo Recibo</button>
    </div>

    <div v-if="recibos.length === 0" class="vazio">
      Nenhum recibo salvo ainda.
    </div>

    <div class="lista">
      <div class="card" v-for="r in recibos" :key="r.id" @click="abrirRecibo(r.id)">
        <div class="info">
          <p><strong>Locador:</strong> {{ r.locador }}</p>
          <p><strong>Locatário:</strong> {{ r.locatario }}</p>
          <p><strong>Data:</strong> <span class="destaque">{{ r.dataExtenso || r.data }}</span></p>
          <p><strong>Total:</strong> <span class="destaque">{{ formatarMoeda(r.total) }}</span></p>
        </div>
        <div class="acoes">
          <button class="excluir" @click.stop="excluir(r.id)">🗑️</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const recibos = ref([]);

onMounted(() => {
  recibos.value = JSON.parse(localStorage.getItem("recibos")) || [];
});

function abrirRecibo(id) {
  router.push(`/recibo/${id}`);
}

function novoRecibo() {
  router.push(`/recibo/novo`);
}

function excluir(id) {
  if (!confirm("Deseja realmente excluir este recibo?")) return;

  recibos.value = recibos.value.filter(r => r.id !== id);
  localStorage.setItem("recibos", JSON.stringify(recibos.value));
}

function formatarMoeda(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  padding: 40px;
  background: #f3f4f6;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* HEADER */
.header {
  width: 100%;
  max-width: 700px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 28px;
  color: #111827;
}

.novo {
  background: #4f46e5;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}
.novo:hover {
  background: #4338ca;
}

/* LISTA */
.lista {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 700px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 6px 15px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.12);
}

.card .info p {
  margin: 4px 0;
  font-size: 15px;
}

.destaque {
  color: #4f46e5;
  font-weight: bold;
}

.acoes button.excluir {
  border: none;
  background: #fee2e2;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.2s;
}
.acoes button.excluir:hover {
  background: #fca5a5;
}

.vazio {
  margin-top: 30px;
  color: #6b7280;
  font-size: 16px;
  font-style: italic;
}
</style>
