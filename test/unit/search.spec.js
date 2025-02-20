// import { shallowMount } from "@vue/test-utils";
// import Search from "@/components/search.vue";

// describe("Search.vue", () => {
//   it("emite el evento 'search' con el valor ingresado", async () => {
//     const wrapper = shallowMount(Search);

//     // Encontrar el input dentro del componente v-text-field utilizando el id
//     const input = wrapper.find("#search-input");

//     // Asegurarse de que el input fue encontrado
//     expect(input.exists()).toBe(true);

//     // Establecer el valor del input y disparar el evento
//     await wrapper.setProps({ searchQuery: "iPhone 12" });
//     await input.trigger("input");

//     // Comprobar si se emite el evento correctamente
//     expect(wrapper.emitted("search")).toBeTruthy();
//     expect(wrapper.emitted("search")[0]).toEqual(["iPhone 12"]);
//   });
// });
