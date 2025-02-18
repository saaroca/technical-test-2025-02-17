<template>
  <div>
    <div class="header-container">
      <h1>Iphones Reacondicionados</h1>
      <sort-dropdown @sort="onSort" />
    </div>

    <div class="phones-container">
      <div
        v-for="sku in filteredSkus"
        :key="sku.id"
        class="phone-card"
        @click="getDetails(sku)"
      >
        <img :src="sku.image" :alt="sku.name" class="phone-image" />
        <div class="phone-details">
          <h3>{{ sku.name }}</h3>
          <SkuBadges
            :grade="sku.grade"
            :color="sku.color"
            :storage="sku.storage"
          />
          <p style="margin-top: 12px">Precio: ${{ sku.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, inject } from "vue";
import useAlexPhone from "../composables/useAlexPhone.ts";
import SkuBadges from "../components/skubadges.vue";
import SortDropdown from "../components/sort.vue";
import { SortOptions, Grade, StorageOrder } from "../constants/constants";

const { fetchSkus, fetchSkuDetails, confirmPurchase } = useAlexPhone();
const skus = ref([]);
const selectedSku = ref(null);
const searchQuery = inject("searchQuery");

const filteredSkus = ref([]);

onMounted(async () => {
  skus.value = await fetchSkus();
  filteredSkus.value = skus.value;
});

watch(searchQuery, (newValue) => {
  console.log("Búsqueda actualizada:", newValue);
  if (newValue.trim() === "") {
    filteredSkus.value = skus.value;
  } else {
    filteredSkus.value = skus.value.filter((sku) =>
      sku.name.toLowerCase().includes(newValue.toLowerCase())
    );
  }
});

const onSort = (sortOption) => {
  if (sortOption === SortOptions.LOW_TO_HIGH) {
    filteredSkus.value = [...filteredSkus.value].sort(
      (a, b) => a.price - b.price
    );
  } else if (sortOption === SortOptions.HIGH_TO_LOW) {
    filteredSkus.value = [...filteredSkus.value].sort(
      (a, b) => b.price - a.price
    );
  } else if (sortOption === SortOptions.GRADE) {
    console.log(sortOption);
    filteredSkus.value = [...filteredSkus.value].sort((a, b) => {
      return (Grade[b.grade] || 0) - (Grade[a.grade] || 0);
    });
  } else if (sortOption === SortOptions.STORAGE) {
    filteredSkus.value = [...filteredSkus.value].sort((a, b) => {
      return StorageOrder.indexOf(a.storage) - StorageOrder.indexOf(b.storage);
    });
  }
};

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
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  margin: 0;
  flex: 1;
}

.sort-dropdown {
  flex: 0 0 30%;
  max-width: 30%;
}

.phones-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 20px;
  padding: 10px;
  justify-content: center;
}

.phone-card {
  background-color: #1e1e1e;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease,
    grid-template-columns 0.5s ease;
}

.phone-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
}

.phone-image {
  width: clamp(150px, 90%, 250px);
  height: auto;
  max-height: 250px;
  border-radius: 8px;
  transition: width 0.3s ease;
}

.phone-details {
  padding: 10px;
  text-align: left;
  margin-top: 10px;
}

.phone-details h3,
.phone-details p {
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .phones-container {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

@media (max-width: 480px) {
  .phones-container {
    grid-template-columns: 1fr;
  }
}
</style>
