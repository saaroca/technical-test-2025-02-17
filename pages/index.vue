<template>
  <div>
    <div class="header-container">
      <h1>Iphones Reacondicionados</h1>
      <search class="search-component" @search="updateSearchQuery" />
      <sort-dropdown @sort="onSort" class="small-sort" />
    </div>

    <div class="phones-container">
      <div
        v-for="sku in filteredSkus"
        :key="sku.id"
        class="phone-card"
        @click="getDetails(sku)"
      >
        <img :src="sku.image" :alt="sku.name" class="phone-image" />
        <div class="phone-details">
          <h3>{{ sku.name }}</h3>
          <SkuBadges
            :grade="sku.grade"
            :color="sku.color"
            :storage="sku.storage"
          />
          <p style="margin-top: 12px">Precio: ${{ sku.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useAlexPhone from "../composables/useAlexPhone.ts";
import SkuBadges from "../components/skubadges.vue";
import SortDropdown from "../components/sort.vue";
import Search from "../components/search.vue";
import { SortOptions, Grade, StorageOrder } from "../constants/constants";

export default {
  components: { SkuBadges, SortDropdown, Search },
  data() {
    return {
      skus: [],
      filteredSkus: [],
      selectedSku: null,
      searchQuery: "",
    };
  },
  async mounted() {
    const { fetchSkus } = useAlexPhone();
    this.skus = await fetchSkus();
    this.filteredSkus = [...this.skus];

    if (this.$route.query.sort) {
      this.onSort(this.$route.query.sort, false);
    }

    if (this.$route.query.search) {
      this.searchQuery = this.$route.query.search;
      this.filterSkus();
    }
  },
  watch: {
    "$route.query.sort"(newSort) {
      if (newSort) {
        this.onSort(newSort, false);
      }
    },
    searchQuery() {
      this.filterSkus();
    },
  },
  methods: {
    onSort(sortOption, updateUrl = true) {
      if (updateUrl) {
        this.$router.push({
          query: {
            ...this.$route.query,
            sort: sortOption,
            search: this.searchQuery,
          },
        });
      }

      if (sortOption === SortOptions.LOW_TO_HIGH) {
        this.filteredSkus = [...this.filteredSkus].sort(
          (a, b) => a.price - b.price
        );
      } else if (sortOption === SortOptions.HIGH_TO_LOW) {
        this.filteredSkus = [...this.filteredSkus].sort(
          (a, b) => b.price - a.price
        );
      } else if (sortOption === SortOptions.GRADE) {
        this.filteredSkus = [...this.filteredSkus].sort(
          (a, b) => (Grade[b.grade] || 0) - (Grade[a.grade] || 0)
        );
      } else if (sortOption === SortOptions.STORAGE) {
        this.filteredSkus = [...this.filteredSkus].sort(
          (a, b) =>
            StorageOrder.indexOf(a.storage) - StorageOrder.indexOf(b.storage)
        );
      }
    },
    getDetails(sku) {
      this.$router.push(`/phone/${sku.sku}/`);
    },

    updateSearchQuery(query) {
      this.searchQuery = query;
      this.$router.push({
        query: { ...this.$route.query, search: query },
      });
    },
    filterSkus() {
      this.filteredSkus = this.skus.filter((sku) =>
        sku.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
.header-container {
  display: flex;
  align-items: baseline;
  margin-top: 10px;
  gap: 50px;
  font-size: 32px;
}

h1 {
  font-size: inherit;
}

.small-sort .search-component {
  max-width: 200px;
  font-size: 14px;
  text-align: center;
}

.phones-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  margin-top: 20px;
  padding: 10px;
  justify-content: center;
}

.phone-card {
  background-color: #1e1e1e;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease,
    grid-template-columns 0.5s ease;
}

.phone-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.3);
  background-color: #333;
  border: 2px solid #2d63e0;
}

.phone-card:hover .phone-image {
  opacity: 0.9;
}

.phone-image {
  width: clamp(150px, 90%, 250px);
  height: auto;
  max-height: 250px;
  border-radius: 8px;
  transition: width 0.3s ease, opacity 0.3s ease;
}

.phone-details {
  padding: 10px;
  text-align: left;
  margin-top: 10px;
}

.phone-details h3,
.phone-details p {
  margin-bottom: 8px;
}

.phone-card:hover .phone-details h3 {
  color: #2d63e0;
  transform: translateY(-5px);
}

@media (max-width: 935px) {
  .phones-container {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  .header-container {
    gap: 10px;
  }
}

@media (max-width: 1264px) {
  .phones-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .header-container {
    font-size: 20px;
  }

  .phones-container {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

@media (max-width: 600px) {
  .phones-container {
    grid-template-columns: 1fr !important;
  }
  .header-container {
    gap: 5px;
  }
}
</style>
