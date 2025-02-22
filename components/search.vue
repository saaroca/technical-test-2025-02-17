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

<script>
export default {
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    cleanQuery(query) {
      if (!query) return query;
      return query.trim().replace(/\s+/g, " ");
    },
    filterPhones() {
      const cleanedQuery = this.cleanQuery(this.searchQuery);
      this.$emit("search", cleanedQuery);
    },
  },
};
</script>
