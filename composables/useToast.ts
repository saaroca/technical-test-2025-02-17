import Vue from "vue";

export const useToastMessages = () => {
  const toast = Vue.prototype.$toast;

  const showSuccess = (message: string) => {
    toast.success(message, {
      timeout: 3000,
    });
  };

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
