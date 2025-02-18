<template>
  <v-text-field
    v-model="searchQuery"
    class="search-input"
    append-icon="mdi-magnify"
    dense
    hide-details
    @input="filterPhones"
  />
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits();
const searchQuery = ref("");

const filterPhones = () => {
  emit("search", searchQuery.value);
};
</script>

<style scoped>
.search-input {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #1e1e1e;
  margin-left: 25px;
  margin-right: 25px;
  border-radius: 6px;
}
</style>
