import ru from 'vuetify/es5/locale/ru';
import colors from 'vuetify/es5/util/colors';
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default {
  lang: {
    locales: { ru },
    current: 'ru',
  },
  theme: {
    themes: {
      light: {
        primary: '#B4162E',
        accent: '#2F2E41',
        secondary: '#374070',
        info: colors.teal,
        warning: colors.amber,
        error: colors.deepOrange,
        success: colors.green,
      },
      dark: {
        primary: '#B4162E',
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3,
      },
    },
  },
};
