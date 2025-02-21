<template>
  <div v-if="sku" class="details-container">
    <div class="image-container">
      <img :src="sku.image" :alt="sku.name" class="phone-image" />
    </div>

    <div class="info-container">
      <h1 class="name">{{ sku.name }}</h1>
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
  <div v-else>
    <Loading></Loading>
  </div>
</template>

<script>
import useAlexPhone from "../../composables/useAlexPhone";
import SkuBadges from "../../components/skubadges.vue";
import { useToastMessages } from "../../composables/useToast";

export default {
  components: { SkuBadges },
  data() {
    return {
      sku: null,
    };
  },
  async mounted() {
    const { showError } = useToastMessages();
    const { fetchSkuDetails } = useAlexPhone();
    const skuId = this.$route.params.id;

    try {
      this.sku = await fetchSkuDetails(skuId);
      if (!this.sku) {
        showError("No se ha encontrado el producto");
      }
    } catch (err) {
      showError("Error al cargar el producto");
    }
  },
  methods: {
    addToCart() {
      const { showSuccess } = useToastMessages();
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(this.sku);
      localStorage.setItem("cart", JSON.stringify(cart));
      showSuccess("Añadido al carrito correctamente");
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
  align-items: center;
  justify-content: center;
}

.phone-image {
  width: 100%;
  height: 100%;
  max-height: 500px;
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

@media (max-width: 800px) {
  .details-container {
    flex-direction: column;
    padding: 20px;
    margin-top: 10px;
  }

  .name,
  .price {
    text-align: center !important;
    align-items: center !important;
  }

  .image-container {
    width: 100%;
    max-width: 500px;
  }
}
</style>
