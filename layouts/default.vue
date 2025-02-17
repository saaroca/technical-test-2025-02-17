<template>
  <v-app dark>
    <v-app-bar fixed app>
      <img
        class="alexphone-logo"
        alt="Vuetify Logo"
        src="https://cdn.alexphone.com/images/icons/header/logo-alexphone-main-header.svg"
      />

      <v-spacer> </v-spacer>
      <div class="cart-btn">
        <v-btn icon to="/">
          <v-icon style="font-size:32px;">mdi-cart-outline</v-icon>
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
export default {
  name: "DefaultLayout",
  data() {
    return {
      fixed: false,
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
</style>
