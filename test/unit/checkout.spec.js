import { shallowMount } from "@vue/test-utils";
import Checkout from "@/pages/checkout/checkout.vue";
import { useToastMessages } from "../../composables/useToast";
import useAlexPhone from "../../composables/useAlexPhone";

jest.mock("../../composables/useToast", () => ({
  useToastMessages: jest.fn(() => ({
    showSuccess: jest.fn(),
    showError: jest.fn(),
  })),
}));

jest.mock("../../composables/useAlexPhone", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    confirmPurchase: jest
      .fn()
      .mockRejectedValue(new Error("Error en la compra")),
  })),
}));

describe("Checkout.vue", () => {
  let wrapper;
  const mockCart = [
    {
      id: 1,
      sku: "SKU123",
      name: "iPhone 12",
      image: "/iphone.jpg",
      storage: 128,
      grade: "excellent",
      color: "black",
      price: 799,
    },
  ];

  beforeEach(async () => {
    localStorage.setItem("cart", JSON.stringify(mockCart));

    showError = useToastMessages().showError;
    confirmPurchase = useAlexPhone().confirmPurchase;

    wrapper = shallowMount(Checkout, {
      mocks: {
        $nuxt: { refresh: jest.fn() },
      },
    });

    await wrapper.vm.$nextTick();
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("debería renderizar la página correctamente con productos en el carrito", async () => {
    expect(wrapper.find("h1").text()).toBe("Resumen de Compra");
    expect(wrapper.find(".cart-item").exists()).toBe(true);
    expect(wrapper.find(".total-price").text()).toContain("799€");
  });

  it("debería mostrar el mensaje de carrito vacío cuando no hay productos", async () => {
    localStorage.removeItem("cart");

    wrapper = shallowMount(Checkout);
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".icon-sad").exists()).toBe(true);
    expect(wrapper.text()).toContain("No hay productos en la cesta");
  });

  // it("debería eliminar un producto del carrito", async () => {
  //   const { showSuccess } = useToastMessages();

  //   // 🛒 Aseguramos que hay un producto en el carrito
  //   localStorage.setItem("cart", JSON.stringify(mockCart));

  //   wrapper = shallowMount(Checkout);
  //   await wrapper.vm.$nextTick(); // Esperamos a que el componente termine de montarse

  //   expect(wrapper.vm.cart.length).toBe(1); // Verificamos que el carrito tiene 1 producto antes de eliminarlo

  //   // ❌ Eliminamos el producto
  //   await wrapper.vm.removeFromCart(0);

  //   expect(showSuccess).toHaveBeenCalledWith("Se ha eliminado del carrito");
  //   expect(wrapper.vm.cart.length).toBe(0); // El carrito debe quedar vacío
  // });

  //   it("debería confirmar la compra y limpiar el carrito", async () => {
  //     const { showSuccess } = useToastMessages();
  //     const { confirmPurchase } = useAlexPhone();

  //     await wrapper.vm.confirmPurchase();

  //     expect(confirmPurchase).toHaveBeenCalled();
  //     expect(showSuccess).toHaveBeenCalledWith("¡Compra confirmada exitosamente!");
  //     expect(wrapper.vm.cart.length).toBe(0);
  //   });

//   it("debería manejar errores en la confirmación de compra", async () => {
//     const { showError } = useToastMessages(); // Asegúrate de que esto esté aquí

//     await wrapper.vm.confirmPurchase(); // Llama al método que debería manejar el error
//     await wrapper.vm.$nextTick(); // Espera a que se procesen las promesas

//     expect(confirmPurchase).toHaveBeenCalled();
//     expect(showError).toHaveBeenCalledWith(
//       "Hubo un error al confirmar tu compra. Por favor, inténtalo de nuevo."
//     );
//   });
});
