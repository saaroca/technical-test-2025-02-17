<template>
  <v-app dark>
    <v-app-bar fixed app>
      <a to="/" icon>
        <img
          class="alexphone-logo"
          alt="AlexPhone Logo"
          src="https://cdn.alexphone.com/images/icons/header/logo-alexphone-main-header.svg"
        />
      </a>

      <!-- <div class="search-container">
        <search @search="onSearch" />
      </div> -->

      <v-spacer></v-spacer>

      <div class="cart-btn">
        <v-btn icon to="/">
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

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.cart-icon {
  font-size: 32px;
}
</style>
