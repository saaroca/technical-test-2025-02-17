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
import { ref, watch } from "vue";

const emit = defineEmits();
const searchQuery = ref("");

const cleanQuery = (query) => {
  return query.trim().replace(/\s+/g, " ");
};

const filterPhones = () => {
  const cleanedQuery = cleanQuery(searchQuery.value);
  emit("search", cleanedQuery);
};

watch(searchQuery, (newValue) => {
  searchQuery.value = cleanQuery(newValue);
});
</script>

<style scoped>
.search-input {
  width: 50%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #1e1e1e;
  margin-left: 25px;
  margin-right: 25px;
  border-radius: 6px;
}
</style>
