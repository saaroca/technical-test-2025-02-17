import { shallowMount } from "@vue/test-utils";
import IdView from "@/pages/phone/_id.vue";
import SkuBadges from "@/components/skubadges.vue";
import useAlexPhone from "@/composables/useAlexPhone";
import { useToastMessages } from "@/composables/useToast";

jest.mock("@/composables/useAlexPhone");
jest.mock("@/composables/useToast");

describe("Id.vue", () => {
  let fetchSkuDetailsMock;
  let showSuccessMock, showErrorMock;

  beforeEach(() => {
    fetchSkuDetailsMock = jest.fn();
    useAlexPhone.mockReturnValue({ fetchSkuDetails: fetchSkuDetailsMock });

    showSuccessMock = jest.fn();
    showErrorMock = jest.fn();
    useToastMessages.mockReturnValue({
      showSuccess: showSuccessMock,
      showError: showErrorMock,
    });

    localStorage.clear();
  });

  it("renderiza correctamente con un SKU", async () => {
    const mockSku = {
      name: "iPhone 13",
      description: "Un gran teléfono",
      storage: "128GB",
      grade: "A",
      color: "Negro",
      price: 799,
      image: "iphone13.jpg",
    };

    fetchSkuDetailsMock.mockResolvedValue(mockSku);

    const wrapper = shallowMount(IdView, {
      mocks: {
        $route: { params: { id: "123" } },
      },
    });

    await wrapper.vm.$nextTick(); // Esperamos a que se resuelva el fetch

    expect(wrapper.find("h1").text()).toBe(mockSku.name);
    expect(wrapper.find("p").text()).toContain(mockSku.description);
    expect(wrapper.find(".price").text()).toContain("799€");
    expect(wrapper.find("img").attributes("src")).toBe(mockSku.image);
    expect(wrapper.findComponent(SkuBadges).exists()).toBe(true);
  });

  it("muestra el mensaje de error si no se encuentra el SKU", async () => {
    fetchSkuDetailsMock.mockResolvedValue(null);

    shallowMount(IdView, {
      mocks: {
        $route: { params: { id: "123" } },
      },
    });

    await new Promise((r) => setTimeout(r, 10));

    expect(showErrorMock).toHaveBeenCalledWith(
      "No se ha encontrado el producto"
    );
  });

  it("maneja errores al cargar el SKU", async () => {
    fetchSkuDetailsMock.mockRejectedValue(new Error("Network Error"));

    shallowMount(IdView, {
      mocks: {
        $route: { params: { id: "123" } },
      },
    });

    await new Promise((r) => setTimeout(r, 10));

    expect(showErrorMock).toHaveBeenCalledWith("Error al cargar el producto");
  });

  it("agrega un producto al carrito", async () => {
    const mockSku = {
      name: "iPhone 13",
      storage: "128GB",
      grade: "A",
      color: "Negro",
      price: 799,
      image: "iphone13.jpg",
    };

    fetchSkuDetailsMock.mockResolvedValue(mockSku);

    const wrapper = shallowMount(IdView, {
      mocks: {
        $route: { params: { id: "123" } },
      },
    });

    await wrapper.vm.$nextTick();

    wrapper.find("button").trigger("click");

    const cart = JSON.parse(localStorage.getItem("cart"));
    expect(cart).toHaveLength(1);
    expect(cart[0].name).toBe("iPhone 13");
    expect(showSuccessMock).toHaveBeenCalledWith(
      "Añadido al carrito correctamente"
    );
  });

  it("no permite agregar más de 10 unidades de un producto", async () => {
    const mockSku = {
      name: "iPhone 13",
      storage: "128GB",
      grade: "A",
      color: "Negro",
      price: 799,
      image: "iphone13.jpg",
    };

    fetchSkuDetailsMock.mockResolvedValue(mockSku);

    const wrapper = shallowMount(IdView, {
      mocks: {
        $route: { params: { id: "123" } },
      },
    });

    await wrapper.vm.$nextTick();

    localStorage.setItem(
      "cart",
      JSON.stringify([{ ...mockSku, quantity: 10 }])
    );

    wrapper.find("button").trigger("click");

    expect(showErrorMock).toHaveBeenCalledWith(
      "No puedes agregar más de 10 unidades de este artículo."
    );
  });
});
