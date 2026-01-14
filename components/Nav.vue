<template>
  <nav class="navbar">
    <div class="container">
      <h1 class="logo" @click="irHome">Home</h1>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function irHome() {
  router.push("/");
}
</script>

<style scoped>
.navbar {
  width: 100%;
  background: #f0f0f0;
  padding: 12px 0;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  position: sticky;
  top: 0;
  z-index: 50;
}

/* container centralizado */
.navbar .container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: center; /* <-- centraliza horizontalmente */
  align-items: center;
  padding: 0 20px;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: #4f46e5;
  transition: color 0.2s;
}
.logo:hover {
  color: #4338ca;
}

@media print {
  .navbar {
    display: none !important;
  }
}

</style>
