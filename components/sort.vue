<template>
  <v-select
    v-model="selectedSortOption"
    :items="sortOptions"
    label="Ordenar por"
    outlined
    dense
    @change="onSortChange"
  />
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { SortOptions, sortText } from "../constants/constants";

const emit = defineEmits();
const selectedSortOption = ref();

const sortOptions = [
  { text: sortText.PRICE_LOW, value: SortOptions.LOW_TO_HIGH },
  { text: sortText.PRICE_HIGH, value: SortOptions.HIGH_TO_LOW },
  { text: sortText.BEST_GRADE, value: SortOptions.GRADE },
  { text: sortText.HIGH_STORAGE, value: SortOptions.STORAGE },
];

const onSortChange = () => {
  emit("sort", selectedSortOption.value);
};
</script>
