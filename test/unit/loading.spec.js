import { mount } from "@vue/test-utils";
import Loading from "../../components/loading.vue";

describe("Loading.vue", () => {
  it("debería renderizar el spinner correctamente", () => {
    const wrapper = mount(Loading);

    expect(wrapper.find(".loading-spinner").exists()).toBe(true);

    expect(wrapper.find(".spinner").exists()).toBe(true);
  });

  it("debería tener la clase de animación en el spinner", () => {
    const wrapper = mount(Loading);
    const spinner = wrapper.find(".spinner");

    expect(spinner.classes()).toContain("spinner");
  });
});
