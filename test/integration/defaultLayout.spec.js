// import { mount } from "@vue/test-utils";
// import DefaultLayout from "@/layouts/default.vue";
// import Search from "@/components/search.vue";
// import SortDropdown from "@/components/sort.vue";

// describe("DefaultLayout.vue", () => {
//   let wrapper;

//   beforeEach(() => {
//     wrapper = mount(DefaultLayout, {
//       stubs: {
//         Search: { template: "<div />" },
//         SortDropdown: { template: "<div />" },
//       },
//       mocks: {
//         $route: {
//           query: {},
//         },
//         $router: {
//           push: jest.fn(),
//         },
//       },
//     });
//   });

//   it("muestra el navbar correctamente", () => {
//     expect(wrapper.find("v-app-bar").exists()).toBe(true);
//   });

//   it("actualiza el searchQuery cuando se activa el evento 'search'", async () => {
//     const searchComponent = wrapper.findComponent(Search);
//     await searchComponent.vm.$emit("search", "iPhone 13");

//     expect(wrapper.vm.searchQuery).toBe("iPhone 13");
//   });

//   it("llama a 'onSort' cuando se activa el evento 'sort'", async () => {
//     const sortComponent = wrapper.findComponent(SortDropdown);
//     await sortComponent.vm.$emit("sort", "high-to-low");

//     expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
//       query: { sort: "high-to-low", search: "" },
//     });
//   });
// });
