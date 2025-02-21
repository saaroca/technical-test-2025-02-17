import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(Toast, {
  position: "bottom-center",
  timeout: 2000,
  closeOnClick: true,
  pauseOnHover: false,
  closeButton: false,
  transition: "Vue-Toastification__bounce",
  maxToasts: 1,
  newestOnTop: true,
  filterBeforeCreate: (
    toast: { type: any },
    toasts: {
      filter: (arg0: (t: any) => boolean) => {
        (): any;
        new (): any;
        length: number;
      };
    }
  ) => {
    if (toasts.filter((t) => t.type === toast.type).length !== 0) {
      return false;
    }

    return toast;
  },
});
