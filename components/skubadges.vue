<template>
  <div class="sku-badges">
    <span v-if="grade" :class="`badge grade-${grade}`">{{ gradeLabel }}</span>
    <span v-if="color" :class="`badge color-${color}`">{{ colorLabel }}</span>
    <span v-if="storage" :class="`badge storage-${storage}`">
      {{ storage }}GB
    </span>
  </div>
</template>

<script>
import { GRADE_TRANSLATIONS, COLOR_TRANSLATIONS } from "~/constants/constants";

export default {
  props: {
    grade: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    storage: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      gradeLabel: "",
      colorLabel: "",
    };
  },
  created() {
    this.gradeLabel =
      {
        excellent: GRADE_TRANSLATIONS.excellent,
        very_good: GRADE_TRANSLATIONS.very_good,
        good: GRADE_TRANSLATIONS.good,
      }[this.grade] || GRADE_TRANSLATIONS.unknown;

    this.colorLabel =
      {
        white: COLOR_TRANSLATIONS.white,
        black: COLOR_TRANSLATIONS.black,
        red: COLOR_TRANSLATIONS.red,
        pink: COLOR_TRANSLATIONS.pink,
      }[this.color] || COLOR_TRANSLATIONS.unknown;
  },
};
</script>

<style scoped>
.sku-badges {
  display: flex;
  gap: 10px;
}

.badge {
  padding: 5px 10px;
  border-radius: 12px;
  font-weight: bold;
  text-transform: capitalize;
  font-size: 12px;
}

.badge.grade-excellent {
  background-color: #4caf50;
  color: white;
}

.badge.grade-very_good {
  background-color: #ffc107;
  color: white;
}

.badge.grade-good {
  background-color: #ff5722;
  color: white;
}

.badge.color-white {
  background-color: #ffffff;
  color: #000;
}

.badge.color-black {
  background-color: #000000;
  color: #fff;
}

.badge.color-red {
  background-color: #f44336;
  color: white;
}

.badge.color-pink {
  background-color: #e91e63;
  color: white;
}

.badge.storage-64 {
  background-color: #2196f3;
  color: white;
}

.badge.storage-128 {
  background-color: #009688;
  color: white;
}

.badge.storage-256 {
  background-color: #3f51b5;
  color: white;
}

.badge.storage-512 {
  background-color: #673ab7;
  color: white;
}
</style>
