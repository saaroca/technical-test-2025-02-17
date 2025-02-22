import { shallowMount } from "@vue/test-utils";
import Checkout from "../../pages/checkout/checkout.vue";
import Loading from "../../components/loading.vue";

jest.mock("@/composables/useToast", () => ({
  useToastMessages: () => ({
    showSuccess: jest.fn(),
    showError: jest.fn(),
  }),
}));

jest.mock("@/composables/useAlexPhone", () => ({
  useAlexPhone: () => ({
    confirmPurchase: jest.fn(),
  }),
}));

describe("CheckoutComponent", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Checkout, {
      data() {
        return {
          cart: [
            {
              id: 1,
              name: "Producto 1",
              storage: "64",
              grade: "A",
              color: "Rojo",
              price: 100,
              quantity: 1,
            },
          ],
          loading: false,
          purchaseConfirmed: false,
        };
      },
    });
  });

//   it("muestra el componente de carga cuando loading es true", () => {
//     wrapper.setData({ loading: true });
//     expect(wrapper.findComponent(Loading).exists()).toBe(true);
//   });

  it("muestra el resumen de compra cuando hay productos en el carrito", () => {
    expect(wrapper.find(".checkout-left").exists()).toBe(true);
    expect(wrapper.find(".checkout-right").exists()).toBe(true);
  });

  //   it("confirma la compra y muestra el mensaje de agradecimiento", async () => {
  //     const confirmPurchaseMock = jest.fn().mockResolvedValueOnce();
  //     wrapper.vm.$options.methods.confirmPurchase = confirmPurchaseMock;

  //     await wrapper.vm.confirmPurchase();

  //     expect(confirmPurchaseMock).toHaveBeenCalled();
  //     expect(wrapper.vm.purchaseConfirmed).toBe(true);
  //     expect(wrapper.find(".thank-you-message").exists()).toBe(true);
  //   });

  it("elimina un producto del carrito", async () => {
    const itemToRemove = wrapper.vm.cart[0];
    wrapper.vm.removeFromCart(itemToRemove);

    expect(wrapper.vm.cart).toHaveLength(0);
    expect(wrapper.vm.cart).not.toContain(itemToRemove);
  });

  it("actualiza la cantidad de un producto en el carrito", async () => {
    const updatedItem = { ...wrapper.vm.cart[0], quantity: 2 };
    wrapper.vm.updateItemQuantity(updatedItem);

    expect(wrapper.vm.cart[0].quantity).toBe(2);
  });

  it("muestra un mensaje cuando no hay productos en el carrito", async () => {
    wrapper.setData({ cart: [] });
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".checkout-container").exists()).toBe(true);
  });
});
