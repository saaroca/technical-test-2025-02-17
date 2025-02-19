import Vue from "vue";

export const useToastMessages = () => {
  const toast = Vue.prototype.$toast;

  // Función para mostrar un mensaje de éxito
  const showSuccess = (message: string) => {
    toast.success(message, {
      timeout: 3000,
    });
  };

  // Función para mostrar un mensaje de error
  const showError = (message: string) => {
    toast.error(message, {
      timeout: 5000,
    });
  };

  return {
    showSuccess,
    showError,
  };
};
