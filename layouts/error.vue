<template>
  <v-app dark>
    <v-container class="text-center">
      <!-- Icono de error -->
      <v-icon large color="error">mdi-alert-circle-outline</v-icon>

      <!-- Mensajes de error -->
      <h1 v-if="error.statusCode === 404">
        {{ pageNotFound }}
      </h1>
      <h1 v-else>
        {{ otherError }}
      </h1>

      <!-- Enlace para volver al inicio -->
      <NuxtLink to="/" class="btn-link"> Volver al inicio </NuxtLink>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "EmptyLayout",
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "Ops! Ha ocurrido un error",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  margin-top: 20px;
}

.v-icon {
  margin-bottom: 20px;
}

.btn-link {
  display: inline-block;
  margin-top: 20px;
  font-size: 18px;
  color: #1976d2;
  text-decoration: none;
}

.btn-link:hover {
  text-decoration: underline;
}
</style>
