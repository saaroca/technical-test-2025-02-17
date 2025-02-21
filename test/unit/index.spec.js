import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Index from "@/pages/index.vue";
import { SortOptions } from "@/constants/constants";

jest.mock("@/composables/useAlexPhone.ts", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    fetchSkus: jest.fn(() =>
      Promise.resolve([
        {
          id: 1,
          name: "iPhone 12",
          price: 699,
          grade: "A",
          storage: "128GB",
          image: "iphone12.jpg",
        },
        {
          id: 2,
          name: "iPhone 11",
          price: 599,
          grade: "B",
          storage: "64GB",
          image: "iphone11.jpg",
        },
      ])
    ),
  })),
}));

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe("Index.vue", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallowMount(Index, { localVue, router });
    await wrapper.vm.$nextTick();
  });

  it("se renderiza correctamente", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("obtiene y muestra los skus", async () => {
    await wrapper.vm.$nextTick();
    const phoneCards = wrapper.findAll(".phone-card");
    expect(phoneCards.length).toBe(2);
    expect(phoneCards.at(0).text()).toContain("iPhone 12");
  });
});
