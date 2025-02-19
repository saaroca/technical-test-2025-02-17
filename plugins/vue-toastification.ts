import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  position: "bottom-center",
  timeout: 5000,
  closeOnClick: true,
  pauseOnHover: true,
};

Vue.use(Toast, options);
