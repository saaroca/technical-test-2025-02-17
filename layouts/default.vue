<template>
  <v-app dark>
    <v-app-bar fixed app>
      <nuxt-link to="/" icon>
        <img
          class="alexphone-logo"
          alt="AlexPhone Logo"
          src="https://cdn.alexphone.com/images/icons/header/logo-alexphone-main-header.svg"
        />
      </nuxt-link>

      <v-spacer></v-spacer>

      <div class="cart-btn">
        <v-btn icon to="/checkout/checkout">
          <v-icon class="cart-icon">mdi-cart-outline</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { ref, provide } from "vue";
import search from "../components/search.vue";

export default {
  name: "DefaultLayout",
  components: {
    search,
  },
  setup() {
    const fixed = ref(false);
    const searchQuery = ref("");

    const onSearch = (query) => {
      console.log(query);
      searchQuery.value = query;
    };

    provide("searchQuery", searchQuery);

    return {
      fixed,
      searchQuery,
      onSearch,
    };
  },
};
</script>

<style scoped>
.alexphone-logo {
  margin-left: 2rem;
}

.cart-btn {
  margin-right: 2rem;
}

.cart-icon {
  font-size: 32px;
}
</style>
