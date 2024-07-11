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
  VIcon,
  VSelect,
  VBtnToggle,
  VDivider,
  VHover,
  VOverlay,
  VToolbar,
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
    VIcon,
    VSelect,
    VBtnToggle,
    VDivider,
    VHover,
    VOverlay,
    VToolbar,
  },
});

export default new Vuetify({
});
