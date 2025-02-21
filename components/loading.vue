<template>
    <div class="loading-spinner">
      <div class="spinner"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Loading'
  }
  </script>
  
  <style scoped>
  .loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
  }
  .spinner {
    width: 100px;
    height: 100px;
    border: 5px solid #007bff;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  </style>
  