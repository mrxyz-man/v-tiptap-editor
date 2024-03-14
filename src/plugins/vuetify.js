import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify, {
  VInput,
  VTextField,
  ClickOutside,
  VContainer,
  VApp,
  VMain,
  VCol,
  VRow,
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
  },
  directives: {
    ClickOutside,
  },
});

export default new Vuetify({
});
