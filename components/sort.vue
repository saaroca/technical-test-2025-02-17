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
import { SortOptions } from "../constants/constants";

const emit = defineEmits();
const selectedSortOption = ref(SortOptions.LOW_TO_HIGH);

const sortOptions = [
  { text: "Precio más bajo", value: SortOptions.LOW_TO_HIGH },
  { text: "Precio más alto", value: SortOptions.HIGH_TO_LOW },
  { text: "Mejor estado", value: SortOptions.GRADE },
  { text: "Mayor almacenamiento", value: SortOptions.STORAGE },
];

const onSortChange = () => {
  emit("sort", selectedSortOption.value);
};
</script>
