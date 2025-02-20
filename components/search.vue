<template>
  <v-text-field
    v-model="searchQuery"
    append-icon="mdi-magnify"
    id="search-input"
    label="¿Qué buscas?"
    @input="filterPhones"
    clearable
    hide-details
    autocomplete="off"
  ></v-text-field>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits();
const searchQuery = ref("");

const cleanQuery = (query) => {
  if (query === null) return query;
  return query.trim().replace(/\s+/g, " ");
};

const filterPhones = () => {
  const cleanedQuery = cleanQuery(searchQuery.value);
  emit("search", cleanedQuery);
};
</script>
