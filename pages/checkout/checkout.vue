<template>
  <div v-if="loading" class="loading-container">
    <Loading />
  </div>
  <div
    v-else-if="cart.length && !purchaseConfirmed"
    class="checkout-wrapper"
    data-test="checkout-wrapper"
  >
    <div class="checkout-left">
      <h1>Resumen de Compra</h1>
      <div class="cart-items">
        <div
          v-for="(item, index) in groupedCart"
          :key="index"
          class="cart-item"
          data-test="cart-item"
        >
          <img :src="item.image" :alt="item.name" class="item-image" />
          <div class="item-info">
            <h2>{{ item.name }}</h2>
            <p>
              {{ item.storage }}GB / {{ translateGrade(item.grade) }} /
              {{ translateColor(item.color) }}
            </p>
            <div class="price-quantity-container">
              <p class="price">Precio: {{ item.price * item.quantity }}€</p>
              <div class="quantity-container">
                <select
                  class="price quantity"
                  :id="'quantity-' + index"
                  v-model="item.quantity"
                  @change="updateItemQuantity(item)"
                >
                  <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                </select>
              </div>
            </div>
          </div>
          <button
            @click="removeFromCart(item)"
            class="delete-button"
            data-test="remove-item-button"
          >
            <v-icon>mdi-trash-can-outline</v-icon>
          </button>
        </div>
      </div>
      <nuxt-link to="/" class="back-button">Volver a la tienda</nuxt-link>
    </div>

    <div class="checkout-right">
      <h1>Checkout</h1>
      <div class="summary-box">
        <p class="price summary-detail">Subtotal: {{ totalPrice }}€</p>
        <p class="price summary-detail">Costos de envío: 0€</p>
        <p class="price summary-detail">Total: {{ totalPrice }}€</p>
        <button
          @click="confirmPurchase"
          class="confirm-button"
          data-test="confirm-purchase-button"
        >
          Confirmar Compra
        </button>
      </div>

      <input
        type="text"
        placeholder="Código de descuento"
        class="discount-input"
        v-model="discountCode"
      />

      <div class="payment-methods">
        <h3>Métodos de pago aceptados:</h3>
        <div class="payment-icons">
          <img src="../../static/paymentLogos.png" alt="paymentLogos" />
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="purchaseConfirmed" class="thank-you-message">
    <v-icon class="icon">mdi-clipboard-check-outline</v-icon>
    <h1>¡Gracias por confiar en nosotros!</h1>
    <h1>Su pedido está en marcha.</h1>
    <nuxt-link to="/">Volver a inicio</nuxt-link>
  </div>

  <div class="checkout-container" style="padding: 4rem" v-else>
    <v-icon class="icon">mdi-emoticon-sad-outline</v-icon>
    <h1>No hay productos en la cesta</h1>
    <nuxt-link to="/">¡Echa un vistazo a nuestros teléfonos!</nuxt-link>
  </div>
</template>

<script>
import useAlexPhone from "../../composables/useAlexPhone";
import { useToastMessages } from "../../composables/useToast";
import { GRADE_TRANSLATIONS, COLOR_TRANSLATIONS } from "~/constants/constants";
export default {
  data() {
    return {
      cart: [],
      discountCode: "",
      loading: true,
      purchaseConfirmed: false,
    };
  },

  computed: {
    groupedCart() {
      const grouped = this.cart.reduce((acc, item) => {
        const key = `${item.name}-${item.storage}-${item.grade}-${item.color}`;
        if (!acc[key]) {
          acc[key] = { ...item, quantity: item.quantity || 1 };
        } else {
          acc[key].quantity += item.quantity || 1;
        }
        return acc;
      }, {});

      return Object.values(grouped);
    },
    totalPrice() {
      return Object.values(this.groupedCart).reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
      );
    },
  },

  async mounted() {
    await this.fetchCart();
  },
  methods: {
    async fetchCart() {
      const { showError } = useToastMessages();
      try {
        setTimeout(() => {
          this.cart = JSON.parse(localStorage.getItem("cart")) || [];
          this.loading = false;
        }, 1000);
      } catch (error) {
        showError("Error al cargar el carrito", error);
        this.loading = false;
      }
    },
    updateCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    updateItemQuantity(updatedItem) {
      const cartItem = this.cart.find(
        (item) =>
          item.name === updatedItem.name &&
          item.storage === updatedItem.storage &&
          item.grade === updatedItem.grade &&
          item.color === updatedItem.color
      );

      if (cartItem) {
        cartItem.quantity = Number(updatedItem.quantity);
        this.updateCart();
      }

      this.$forceUpdate();
    },
    async confirmPurchase() {
      const { showSuccess, showError } = useToastMessages();
      const { confirmPurchase } = useAlexPhone();

      const orderData = {
        skus: this.groupedCart.map((item) => ({
          id: item.id,
          sku: item.sku,
          grade: item.grade,
          color: item.color,
          storage: item.storage,
          quantity: item.quantity,
        })),
      };

      try {
        await confirmPurchase(orderData);
        showSuccess("¡Compra confirmada exitosamente!");
        localStorage.removeItem("cart");
        this.cart = [];
        this.purchaseConfirmed = true;
      } catch (error) {
        showError(
          "Hubo un error al confirmar tu compra. Por favor, inténtalo de nuevo."
        );
      }
    },
    removeFromCart(itemToRemove) {
      const { showSuccess } = useToastMessages();
      this.cart = this.cart.filter(
        (item) =>
          !(
            item.name === itemToRemove.name &&
            item.storage === itemToRemove.storage &&
            item.grade === itemToRemove.grade &&
            item.color === itemToRemove.color
          )
      );
      localStorage.setItem("cart", JSON.stringify(this.cart));
      showSuccess("Se ha eliminado del carrito");
    },
    translateGrade(grade) {
      return GRADE_TRANSLATIONS[grade] || grade;
    },
    translateColor(color) {
      return COLOR_TRANSLATIONS[color] || color;
    },
  },
};
</script>

<style scoped>
.checkout-wrapper {
  display: flex;
  justify-content: space-between;
  max-width: 1800px;
  margin: 150px auto;
  gap: 40px;
}

.checkout-left {
  flex: 1;
  padding-right: 20px;
}

.checkout-right {
  width: 416px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.checkout-container {
  max-width: 800px;
  margin: 50px auto;
  text-align: center;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* Para dejar a la misma altura que el checkout que tiene un gap de 15px */
  padding-top: 15px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.item-info {
  flex: 1;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
}

.summary-box {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

.confirm-button {
  width: 100%;
  background-color: #007bff;
  color: white;
  padding: 12px;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  border-radius: 5px;
  margin-top: 10px;
}

.confirm-button:hover {
  background-color: #0056b3;
}

.discount-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: white;
}

.payment-methods h3 {
  margin-bottom: 10px;
  text-align: center;
  margin-top: 20px;
}

.payment-icons {
  display: flex;
  gap: 10px;
}

.payment-icons img {
  width: 100%;
  height: 100%;
}

.back-button {
  display: inline-block;
  margin-top: 20px;
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}
.back-button:hover {
  text-decoration: underline;
}

.delete-button {
  transition: transform 0.2s ease-in-out;
  align-self: flex-start;
  margin-top: 5px;
}

.delete-button:hover {
  transform: scale(1.2);
  color: #c82333;
}
.icon {
  font-size: 100px;
  margin-bottom: 40px;
}

h1 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 10px;
}

.summary-detail {
  text-align: left;
  padding: 5px;
}

.price-quantity-container {
  display: flex;
  flex-wrap: nowrap;
  gap: 15px;
  align-items: baseline;
}

.quantity-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.quantity {
  background: white;
  border-radius: 8px;
  padding: 5px;
  border: 1px solid #ccc;
  text-align: center;
  font-size: 16px;
  transition: all 0.3s ease;
}

.quantity:hover {
  border-color: #007bff;
}

@media (max-width: 850px) {
  .checkout-wrapper {
    flex-direction: column;
    margin: 25px auto;
  }
  .checkout-left,
  .checkout-right {
    min-width: 100%;
  }
  .payment-icons {
    display: flex;
    justify-content: center;
  }

  .payment-icons img {
    width: 50%;
  }

  .checkout-left,
  .checkout-right {
    padding: 15px;
  }

  .checkout-right {
    width: auto;
  }
}

.thank-you-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  text-align: center;
}

.thank-you-message h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
</style>
