import { mount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Sort from "../../components/sort.vue";
import { sortText, SortOptions } from "~/constants/constants";
describe("sort", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("debería renderizar el componente correctamente", () => {
    const wrapper = mount(Sort, {
      vuetify,
    });
    expect(wrapper.exists()).toBe(true);
    const select = wrapper.find("#sort-select");
    expect(select.exists()).toBe(true);
  });

  it("debería tener las opciones de ordenamiento correctas", () => {
    const wrapper = mount(Sort, {
      vuetify,
    });

    const options = wrapper.vm.sortOptions;

    expect(options).toEqual([
      { text: sortText.PRICE_LOW, value: SortOptions.LOW_TO_HIGH },
      { text: sortText.PRICE_HIGH, value: SortOptions.HIGH_TO_LOW },
      { text: sortText.BEST_GRADE, value: SortOptions.GRADE },
      { text: sortText.HIGH_STORAGE, value: SortOptions.STORAGE },
    ]);
  });

  it("debería mostrar las opciones en el select", async () => {
    const wrapper = mount(Sort, {
      vuetify,
    });

    const select = wrapper.find("#sort-select");

    await select.trigger("click");

    await wrapper.vm.$nextTick();

    const menu = wrapper.find(".v-menu__content");
    expect(menu.exists()).toBe(true);

    const options = wrapper.findAll(".v-list-item");
    expect(options.length).toBeGreaterThan(0);
  });
});
