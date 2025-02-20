import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  position: "bottom-center",
  timeout: 2000,
  closeOnClick: true,
};

Vue.use(Toast, options);
