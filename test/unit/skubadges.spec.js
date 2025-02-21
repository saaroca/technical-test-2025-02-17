import { mount } from "@vue/test-utils";
import SkuBadges from "../../components/skubadges.vue";
import { GRADE_TRANSLATIONS, COLOR_TRANSLATIONS } from "~/constants/constants";

describe("SkuBadges.vue", () => {
  it("debería renderizar el badge de grado correctamente", () => {
    const wrapper = mount(SkuBadges, {
      propsData: { grade: "excellent" },
    });
    console.log(wrapper.html());

    const gradeBadge = wrapper.find(".badge.grade-excellent");
    expect(gradeBadge.exists()).toBe(true);
    expect(gradeBadge.text()).toBe(GRADE_TRANSLATIONS.excellent);
  });

  it("debería renderizar el badge de color correctamente", () => {
    const wrapper = mount(SkuBadges, {
      propsData: { color: "black" },
    });

    const colorBadge = wrapper.find(".badge.color-black");
    expect(colorBadge.exists()).toBe(true);
    expect(colorBadge.text()).toBe(COLOR_TRANSLATIONS.black);
  });

  it("debería renderizar el badge de almacenamiento correctamente", () => {
    const wrapper = mount(SkuBadges, {
      propsData: { storage: 128 },
    });

    const storageBadge = wrapper.find(".badge.storage-128");
    expect(storageBadge.exists()).toBe(true);
    expect(storageBadge.text()).toBe("128GB");
  });

  it("debería mostrar múltiples badges cuando recibe múltiples props", () => {
    const wrapper = mount(SkuBadges, {
      propsData: { grade: "good", color: "red", storage: 256 },
    });

    expect(wrapper.find(".badge.grade-good").exists()).toBe(true);
    expect(wrapper.find(".badge.color-red").exists()).toBe(true);
    expect(wrapper.find(".badge.storage-256").exists()).toBe(true);
  });

  it("no debería mostrar badges si no se pasan props", () => {
    const wrapper = mount(SkuBadges);
    expect(wrapper.findAll(".badge").length).toBe(0);
  });
});
