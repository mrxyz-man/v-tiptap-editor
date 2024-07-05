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
import { Mutate } from 'vuetify/lib/directives';

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
  directives: {
    Mutate,
  },
});

export default new Vuetify({
});
