<template>
  <div v-if="sku" class="details-container">
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
</template>

<script>
import useAlexPhone from "../../composables/useAlexPhone";
export default {
  async asyncData({ params }) {
    console.log(params);

    const { fetchSkuDetails } = useAlexPhone();
    const skus = await fetchSkuDetails(params.id);
    const sku = skus.find((sku) => sku.id === parseInt(params.id));

    return { sku };
  },
  methods: {
    addToCart() {
      console.log("Producto añadido al carrito:", this.sku);
    },
  },
};
</script>
