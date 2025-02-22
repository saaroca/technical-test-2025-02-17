import { shallowMount } from "@vue/test-utils";
import Footer from "../../components/footer.vue";

describe("Footer.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Footer);
  });

  it("debería renderizar correctamente el componente", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("debería contener la sección '¿Dónde estamos?'", () => {
    const locationHeader = wrapper.find("h3");
    expect(locationHeader.text()).toBe("¿Dónde estamos?");
  });

  it("debería mostrar la dirección correcta", () => {
    const address = wrapper.find(".location .footer-text");
    expect(address.text()).toContain("C/ de Mallorca, 134, 08036 Barcelona");
  });

  it("debería mostrar el horario de atención", () => {
    const schedule = wrapper.find(".schedule .footer-text");
    expect(schedule.text()).toContain("Horario: lunes a viernes");
  });

  it("debería mostrar los números de contacto", () => {
    const contactNumber = wrapper.find(".contact .footer-text");
    expect(contactNumber.text()).toBe("+34 680 38 12 32");
  });

  it("debería contener los titulos enlaces de interés y atención al cliente", () => {
    const interestLinks = wrapper.findAll("h3");
    const expectedLinks = ["Enlaces de interés", "Atención al cliente"];
    expect(interestLinks.at(1).text()).toBe(expectedLinks[0]);
    expect(interestLinks.at(2).text()).toBe(expectedLinks[1]);
  });

  it("debería contener enlaces a redes sociales", () => {
    const socialLinksCol = wrapper.find('[data-test="social-links"]');
    const socialLinks = socialLinksCol.findAll("a");

    expect(socialLinks.length).toBe(4);
    expect(socialLinks.at(0).text()).toContain("Blog");
    expect(socialLinks.at(1).text()).toContain("Instagram");
    expect(socialLinks.at(2).text()).toContain("Facebook");
    expect(socialLinks.at(3).text()).toContain("WhatsApp");
  });

  it("debería contener enlaces de atención al cliente", () => {
    const customerServiceCol = wrapper.find(
      '[data-test="customer-service-links"]'
    );
    const customerServiceLinks = customerServiceCol.findAll("p a");

    expect(customerServiceLinks.length).toBe(6);
    expect(customerServiceLinks.at(0).text()).toContain("Contacto");
    expect(customerServiceLinks.at(1).text()).toContain("FAQ");
    expect(customerServiceLinks.at(2).text()).toContain("Grados estéticos");
    expect(customerServiceLinks.at(3).text()).toContain("Envio y pago");
    expect(customerServiceLinks.at(4).text()).toContain("Devoluciones");
    expect(customerServiceLinks.at(5).text()).toContain("Black Friday");
  });
});
