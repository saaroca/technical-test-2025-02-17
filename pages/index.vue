<template>
  <div>
    <h1>Lista de iPhones</h1>
    <div class="phones-container">
      <div v-for="sku in skus" :key="sku.id" class="phone-card">
        <img :src="sku.image" :alt="sku.name" class="phone-image" />
        <div class="phone-details">
          <h3>{{ sku.name }}</h3>
          <p>{{ sku.description }}</p>
          <p>Precio: ${{ sku.price }}</p>
          <button @click="getDetails(sku)">Ver detalles</button>
        </div>
      </div>
    </div>

    <div v-if="selectedSku" class="selected-sku-details">
      <h2>{{ selectedSku.name }}</h2>
      <p><strong>Descripción:</strong> {{ selectedSku.description }}</p>
      <p><strong>Calificación:</strong> {{ selectedSku.grade }}</p>
      <p><strong>Color:</strong> {{ selectedSku.color }}</p>
      <p><strong>Almacenamiento:</strong> {{ selectedSku.storage }} GB</p>
      <p><strong>Precio:</strong> ${{ selectedSku.price }}</p>
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
  selectedSku.value = await fetchSkuDetails(sku.sku);
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

<style scoped>
.phones-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.phone-card {
  background-color: #1e1e1e;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.phone-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.phone-details {
  margin-top: 10px;
}

.selected-sku-details {
  margin-top: 20px;
  padding: 20px;
  background-color: #fafafa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.selected-sku-details h2 {
  margin-top: 0;
}
</style>
