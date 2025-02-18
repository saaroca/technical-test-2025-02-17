<template>
    <div class="sku-badges">
      <span v-if="grade" :class="`badge grade-${grade}`">{{ gradeLabel }}</span>
      <span v-if="color" :class="`badge color-${color}`">{{ colorLabel }}</span>
      <span v-if="storage" :class="`badge storage-${storage}`">{{ storage }}GB</span>
    </div>
  </template>
  
  <script setup>
  // Recibimos las propiedades a través de defineProps
  const props = defineProps({
    grade: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    storage: {
      type: Number,
      required: true
    }
  });
  
  // Mapeamos los valores de las props a etiquetas fijas
  const gradeLabel = {
    "excellent": "Excelente",
    "very_good": "Muy Bueno",
    "good": "Bueno"
  }[props.grade] || "Desconocido";
  
  const colorLabel = {
    "white": "Blanco",
    "black": "Negro",
    "red": "Rojo",
    "pink": "Rosa"
  }[props.color] || "Desconocido";
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
  }
  
  .badge.grade-excellent {
    background-color: #4CAF50;
    color: white;
  }
  
  .badge.grade-very_good {
    background-color: #FFC107;
    color: white;
  }
  
  .badge.grade-good {
    background-color: #FF5722;
    color: white;
  }
  
  .badge.color-white {
    background-color: #FFFFFF;
    color: #000;
  }
  
  .badge.color-black {
    background-color: #000000;
    color: #FFF;
  }
  
  .badge.color-red {
    background-color: #F44336;
    color: white;
  }
  
  .badge.color-pink {
    background-color: #E91E63;
    color: white;
  }
  
  .badge.storage-64 {
    background-color: #2196F3;
    color: white;
  }
  
  .badge.storage-128 {
    background-color: #009688;
    color: white;
  }
  
  .badge.storage-256 {
    background-color: #3F51B5;
    color: white;
  }
  
  .badge.storage-512 {
    background-color: #673AB7;
    color: white;
  }
  </style>
  