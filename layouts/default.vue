<template>
  <v-app dark>
    <v-app-bar 
      fixed 
      app 
      :class="{ 'hide-navbar': isHidden }"
    >
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
import { ref, onMounted, onUnmounted, provide } from "vue";
import search from "../components/search.vue";

export default {
  name: "DefaultLayout",
  components: {
    search,
  },
  setup() {
    const fixed = ref(false);
    const searchQuery = ref("");
    const isHidden = ref(false);
    let lastScrollY = 0;

    const onSearch = (query) => {
      searchQuery.value = query;
    };

    const handleScroll = () => {
      console.log("handleScroll")
      const currentScrollY = window.scrollY;
      isHidden.value = currentScrollY > lastScrollY && currentScrollY > 50;
      lastScrollY = currentScrollY;
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    provide("searchQuery", searchQuery);

    return {
      fixed,
      searchQuery,
      onSearch,
      isHidden,
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

.hide-navbar {
  transform: translateY(-100%) !important;
  transition: transform 0.3s ease-in-out !important;
}
</style>
