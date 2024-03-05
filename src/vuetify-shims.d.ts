import { Vuetify } from 'vuetify/types';

declare module 'vue/types/options' {
  interface ComponentOptions {
    vuetify?: Vuetify;
  }
}
