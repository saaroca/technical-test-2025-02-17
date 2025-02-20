<template>
  <v-select
    v-model="selectedSortOption"
    :items="sortOptions"
    item-text="text"
    item-value="value"
    label="Ordenar por"
    clearable
    @change="onSortChange"
    id="sort-select"
  />
</template>

<script>
import { SortOptions, sortText } from "../constants/constants";

export default {
  data() {
    return {
      selectedSortOption: null,
      sortOptions: [
        { text: sortText.PRICE_LOW, value: SortOptions.LOW_TO_HIGH },
        { text: sortText.PRICE_HIGH, value: SortOptions.HIGH_TO_LOW },
        { text: sortText.BEST_GRADE, value: SortOptions.GRADE },
        { text: sortText.HIGH_STORAGE, value: SortOptions.STORAGE },
      ],
    };
  },
  methods: {
    onSortChange() {
      if (this.selectedSortOption) {
        this.$emit("sort", this.selectedSortOption);
      } else {
        this.$emit("reset-sort");
      }
    },
  },
};
</script>
