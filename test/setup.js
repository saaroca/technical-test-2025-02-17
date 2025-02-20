import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

Vue.config.mocks = {
  $route: { query: {} },
  $router: {
    push: jest.fn(),
  },
};
