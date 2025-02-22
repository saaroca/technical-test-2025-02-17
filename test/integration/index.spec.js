import { shallowMount } from "@vue/test-utils";
import Index from "../../pages/index.vue";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: 1,
          name: "iPhone 12",
          image: "iphone12.jpg",
          price: 600,
          grade: "A",
          color: "Black",
          storage: "128GB",
          sku: "iphone12-128gb-black",
        },
      ]),
  })
);

jest.mock("../../composables/useAlexPhone.ts", () => {
  return jest.fn(() => ({
    fetchSkus: jest.fn().mockResolvedValue([
      {
        id: 1,
        name: "iPhone 12",
        image: "iphone12.jpg",
        price: 600,
        grade: "A",
        color: "Black",
        storage: "128GB",
        sku: "iphone12-128gb-black",
      },
    ]),
  }));
});

describe("Index.vue", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallowMount(Index);
    await wrapper.vm.$nextTick();
  });

  it("debe renderizar el título correctamente", () => {
    expect(wrapper.find('[data-test="title"]').text()).toBe(
      "Iphones Reacondicionados"
    );
  });

  it("debe mostrar la lista de teléfonos", async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('[data-test="phone-card"]').length).toBe(1);
  });

  it("debe filtrar la lista de teléfonos al realizar una búsqueda", async () => {
    await wrapper
      .find('[data-test="search-component"]')
      .vm.$emit("search", "iPhone 12");
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('[data-test="phone-card"]').length).toBe(1);
  });

  it("debe actualizar la lista cuando se ordena por precio de menor a mayor", async () => {
    await wrapper
      .find('[data-test="sort-dropdown"]')
      .vm.$emit("sort", "LOW_TO_HIGH");
    await wrapper.vm.$nextTick();
    expect(wrapper.find('[data-test="phone-price"]').text()).toContain("600€");
  });
});
