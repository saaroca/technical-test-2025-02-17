import Vue from "vue";

export const useToastMessages = () => {
  const toast = Vue.prototype.$toast;

  const showSuccess = (message: string) => {
    toast.success(message, {
      timeout: 2000,
    });
  };

  const showError = (message: string) => {
    toast.error(message, {
      timeout: 3000,
    });
  };

  return {
    showSuccess,
    showError,
  };
};
