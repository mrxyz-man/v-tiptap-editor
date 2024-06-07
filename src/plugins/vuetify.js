import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify, {
  VInput,
  VTextField,
  VContainer,
  VApp,
  VMain,
  VCol,
  VRow,
  VBtn,
} from 'vuetify/lib';

Vue.use(Vuetify, {
  components: {
    VInput,
    VTextField,
    VContainer,
    VApp,
    VMain,
    VCol,
    VRow,
    VBtn,
  },
});

export default new Vuetify({
});
