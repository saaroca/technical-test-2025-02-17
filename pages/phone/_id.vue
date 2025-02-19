<template>
  <div v-if="sku" class="details-container">
    <div class="image-container">
      <img :src="sku.image" :alt="sku.name" class="phone-image" />
    </div>

    <div class="info-container">
      <h1>{{ sku.name }}</h1>
      <p>{{ sku.description }}</p>
      <p>Capacidad</p>
      <SkuBadges :storage="sku.storage" class="badge" />
      <p>Estado</p>
      <SkuBadges :grade="sku.grade" class="badge" />
      <p>Color</p>
      <SkuBadges :color="sku.color" class="badge" />
      <p class="price">Precio: ${{ sku.price }}</p>
      <button @click="addToCart" class="buy-button">COMPRAR AHORA</button>
    </div>
  </div>
  <p v-else>Cargando detalles...</p>
</template>

<script>
import useAlexPhone from "../../composables/useAlexPhone";
import SkuBadges from "../../components/skubadges.vue";

export default {
  components: { SkuBadges },
  async asyncData({ params }) {
    const { fetchSkuDetails } = useAlexPhone();
    const sku = await fetchSkuDetails(params.id);
    return { sku };
  },
  methods: {
    addToCart() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(this.sku);
      localStorage.setItem("cart", JSON.stringify(cart));
    },
  },
};
</script>

<style scoped>
.details-container {
  display: flex;
  gap: 40px;
  align-items: center;
  max-width: 900px;
  margin: 50px auto;
  justify-content: center;
}

.image-container {
  flex: 1;
  display: flex;
  align-items: stretch;
}

.phone-image {
  width: 100%;
  height: 500px;
}

.info-container {
  flex: 1;
}

.badge {
  margin-bottom: 20px !important;
}

.price {
  font-size: 1.4rem;
  font-weight: bold;
}

.buy-button {
  background-color: #007bff;
  color: white;
  padding: 12px 18px;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  border-radius: 5px;
  width: 100%;
}

.buy-button:hover {
  background-color: #0056b3;
}
</style>
