import { shallowMount } from "@vue/test-utils";
import Checkout from "../../pages/checkout/checkout.vue";

jest.mock("../../composables/useToast", () => ({
  useToastMessages: jest.fn(() => ({
    showSuccess: jest.fn(),
    showError: jest.fn(),
  })),
}));

jest.mock("../../composables/useAlexPhone", () => ({
  useAlexPhone: jest.fn(() => ({
    confirmPurchase: jest.fn(),
  })),
}));

describe("Checkout.vue", () => {
  let wrapper;
  const mockCart = [
    {
      name: "Producto 1",
      storage: "64",
      grade: "A",
      color: "Rojo",
      price: 100,
      quantity: 1,
    },
    {
      name: "Producto 2",
      storage: "128",
      grade: "B",
      color: "Azul",
      price: 200,
      quantity: 2,
    },
  ];

  beforeEach(() => {
    wrapper = shallowMount(Checkout, {
      data() {
        return {
          cart: mockCart,
          loading: false,
          purchaseConfirmed: false,
        };
      },
    });
  });

  it("debería mostrar el resumen de compra cuando hay productos en el carrito", () => {
    expect(wrapper.find(".checkout-wrapper").exists()).toBe(true);
    expect(wrapper.find(".cart-item").exists()).toBe(true);
  });

  it("debería calcular el precio total correctamente", () => {
    expect(wrapper.vm.totalPrice).toBe(500);
  });

  it("debería eliminar un producto del carrito", () => {
    const itemToRemove = mockCart[0];
    wrapper.vm.removeFromCart(itemToRemove);

    expect(wrapper.vm.cart).toHaveLength(1);
    expect(wrapper.vm.cart[0].name).toBe("Producto 2");
  });
});
