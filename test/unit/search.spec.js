import { mount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Search from "../../components/search.vue"

describe("Search.vue", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("debería renderizar el componente correctamente", () => {
    const wrapper = mount(Search, { vuetify });
    expect(wrapper.exists()).toBe(true);
  });

  it("debería renderizar el input correctamente", () => {
    const wrapper = mount(Search, { vuetify });
    const input = wrapper.find("#search-input");
    expect(input.exists()).toBe(true);
  });

  it("debería actualizar el v-model cuando el usuario escribe", async () => {
    const wrapper = mount(Search, { vuetify });
    const input = wrapper.find("#search-input");

    await input.setValue("iPhone");

    expect(wrapper.vm.searchQuery).toBe("iPhone");
  });
});
