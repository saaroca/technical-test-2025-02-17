<template>
  <v-footer :absolute="!fixed" app>
    <v-container class="footer-container">
      <v-row justify="center">
        <v-col cols="6" md="3">
          <div class="footer-info">
            <h3>¿Dónde estamos?</h3>
            <div class="location">
              <v-icon class="footer-icon">mdi-map-marker</v-icon>
              <span class="footer-text" style="padding-right: 10px"
                >C/ de Mallorca, 134, 08036 Barcelona</span
              >
            </div>
            <div class="schedule">
              <v-icon class="footer-icon">mdi-clock-outline</v-icon>
              <span class="footer-text">Horario: lunes a viernes</span>
            </div>
            <div class="hours">
              <p class="footer-text">10:00 - 14:00</p>
              <p class="footer-text">16:00 - 20:00</p>
            </div>
            <div class="contact">
              <v-icon class="footer-icon">mdi-phone</v-icon>
              <span class="footer-text">+34 680 38 12 32</span>
            </div>
          </div>
        </v-col>
        <v-col cols="6" md="3">
          <h3>Enlaces de interés</h3>
          <p>
            <v-icon>mdi-post-outline</v-icon>
            <a href="https://www.alexphone.es/blog">Blog</a>
          </p>
          <p>
            <v-icon>mdi-instagram</v-icon>
            <a href="https://www.instagram.com/alexphone_spain/">Instagram</a>
          </p>
          <p>
            <v-icon>mdi-facebook</v-icon>
            <a href="https://www.facebook.com/alexphone.es">Facebook</a>
          </p>
          <p>
            <v-icon>mdi-whatsapp</v-icon>
            <a
              href="https://api.whatsapp.com/send/?phone=680381232&text&type=phone_number&app_absent=0"
              >WhatsApp</a
            >
          </p>
        </v-col>
        <v-col cols="6" md="3">
          <h3>Atención al cliente</h3>
          <p><a href="https://www.alexphone.es/contacto">Contacto</a></p>
          <p><a href="https://www.alexphone.es/preguntas-frecuentes">FAQ</a></p>
          <p>
            <a href="https://www.alexphone.es/grados-esteticos"
              >Grados estéticos</a
            >
          </p>
          <p>
            <a href="https://www.alexphone.es/envio-y-pago">Envio y pago</a>
          </p>
          <p>
            <a href="https://www.alexphone.es/devoluciones">Devoluciones</a>
          </p>
          <p>
            <a href="https://www.alexphone.es/black-friday">Black Friday</a>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  props: {
    fixed: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.footer-container {
  padding: 5px;
}

.footer-info {
  display: flex;
  flex-direction: column;
}

.footer-icon {
  margin-right: 10px;
}

.footer-text {
  font-size: 16px;
  line-height: 1.5;
}

.location,
.schedule,
.contact {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.hours {
  display: flex;
  flex-direction: column;
  margin-left: 34px;
}

h3 {
  margin-bottom: 10px;
}

@media (max-width: 960px) {
  .justify-center {
    justify-content: left !important;
    padding-left: 25px;
  }
}
</style>
