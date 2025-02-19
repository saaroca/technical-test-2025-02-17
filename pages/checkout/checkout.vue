<template>
  <div class="checkout-container">
    <h1>Resumen de Compra</h1>
    <div v-if="cart.length" class="cart-items">
      <div v-for="(item, index) in cart" :key="index" class="cart-item">
        <img :src="item.image" :alt="item.name" class="item-image" />
        <div class="item-info">
          <h2>{{ item.name }}</h2>
          <p>
            {{ item.storage }}GB / {{ translateGrade(item.grade) }} /
            {{ translateColor(item.color) }}
          </p>
          <p class="price">Precio: ${{ item.price }}</p>
        </div>
        <button @click="removeFromCart(index)" class="delete-button">
          <v-icon>mdi-trash-can-outline</v-icon>
        </button>
      </div>
      <p class="total-price">Total: ${{ totalPrice }}</p>
      <button @click="confirmPurchase" class="confirm-button">
        Confirmar Compra
      </button>
    </div>
    <div style="padding: 4rem" v-else>
      <p>No hay productos en el carrito.</p>
      <nuxt-link to="/">Voler a inicio</nuxt-link>
    </div>
  </div>
</template>

<script>
import useAlexPhone from "../../composables/useAlexPhone";
import { useToastMessages } from "../../composables/useToast";
import { GRADE_TRANSLATIONS, COLOR_TRANSLATIONS } from "~/utils/constants";
export default {
  data() {
    return {
      cart: [],
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((sum, item) => sum + item.price, 0);
    },
  },
  mounted() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
  },
  methods: {
    async confirmPurchase() {
      const { showSuccess, showError } = useToastMessages();
      const { confirmPurchase } = useAlexPhone();

      const orderData = {
        skus: this.cart.map((item) => ({
          id: item.id,
          sku: item.sku,
          grade: item.grade,
          color: item.color,
          storage: item.storage,
        })),
      };

      try {
        await confirmPurchase(orderData);

        showSuccess("¡Compra confirmada exitosamente!");

        localStorage.removeItem("cart");
        this.cart = [];
      } catch (error) {
        showError(
          "Hubo un error al confirmar tu compra. Por favor, inténtalo de nuevo."
        );
      }
    },

    removeFromCart(index) {
      const { showSuccess } = useToastMessages();
      showSuccess("Se ha eliminado del carrito");
      this.cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    translateGrade(grade) {
      const translations = {
        excellent: GRADE_TRANSLATIONS.excellent,
        very_good: GRADE_TRANSLATIONS.very_good,
        good: GRADE_TRANSLATIONS.good,
      };
      return translations[grade] || grade;
    },
    translateColor(color) {
      const translations = {
        white: COLOR_TRANSLATIONS.white,
        black: COLOR_TRANSLATIONS.black,
        red: COLOR_TRANSLATIONS.red,
        pink: COLOR_TRANSLATIONS.pink,
      };
      return translations[color] || color;
    },
  },
};
</script>

<style scoped>
.checkout-container {
  max-width: 800px;
  margin: 50px auto;
  text-align: center;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: flex;
  gap: 20px;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.item-info {
  flex: 1;
  text-align: left;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
}

.total-price {
  font-size: 1.4rem;
  font-weight: bold;
  margin-top: 20px;
}

.confirm-button {
  background-color: #28a745;
  color: white;
  padding: 12px 18px;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  border-radius: 5px;
}

.confirm-button:hover {
  background-color: #218838;
}

.delete-button {
  /* background-color: #dc3545; */
  color: #dc3545;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 1.5rem;
  border-radius: 5px;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>
