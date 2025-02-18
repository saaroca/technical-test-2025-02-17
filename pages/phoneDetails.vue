<template>
  <div class="details-container">
    <div v-if="sku">
      <div class="image-container">
        <img :src="sku.image" :alt="sku.name" class="phone-image" />
      </div>

      <div class="info-container">
        <h1>{{ sku.name }}</h1>
        <p>Precio: ${{ sku.price }}</p>
        <p>{{ sku.description }}</p>
        <p><strong>Capacidad:</strong> {{ sku.storage }}</p>
        <p><strong>Grado:</strong> {{ sku.grade }}</p>
        <p><strong>Color:</strong> {{ sku.color }}</p>

        <button @click="addToCart">COMPRAR</button>
      </div>
    </div>
    <p v-else>Cargando detalles...</p>
  </div>
</template>

<script>
import useAlexPhone from "../composables/useAlexPhone.ts";

export default {
  props: ["id"],
  data() {
    return {
      sku: null,
    };
  },
  async mounted() {
    const { fetchSkuDetails } = useAlexPhone();
    this.sku = await fetchSkuDetails(this.id);
  },
  methods: {
    addToCart() {
      console.log("Producto añadido al carrito:", this.sku);
    },
  },
};
</script>
