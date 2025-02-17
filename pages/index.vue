<template>
  <div>
    <h1>Lista de iPhones</h1>
    <ul>
      <li v-for="sku in skus" :key="sku.id">
        <span>{{ sku.name }}</span>
        <button @click="getDetails(sku.id)">Ver detalles</button>
      </li>
    </ul>

    <div v-if="selectedSku">
      <h2>{{ selectedSku.name }}</h2>
      <p>Precio: ${{ selectedSku.price }}</p>
      <button @click="buyNow">Comprar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useAlexPhone from "../composables/useAlexPhone";

const { fetchSkus, fetchSkuDetails, confirmPurchase } = useAlexPhone();
const skus = ref([]);
const selectedSku = ref(null);

onMounted(async () => {
  skus.value = await fetchSkus();
});

const getDetails = async (sku) => {
  selectedSku.value = await fetchSkuDetails(sku);
};

const buyNow = async () => {
  try {
    await confirmPurchase({ sku: selectedSku.value.id, quantity: 1 });
    alert("Compra confirmada");
  } catch (error) {
    alert(error.message);
  }
};
</script>
