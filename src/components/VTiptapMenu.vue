<script>
import Vue from 'vue';
import VMenu from 'vuetify/lib/components/VMenu/VMenu';
import { convertToUnit } from 'vuetify/lib/util/helpers';

export default Vue.extend({
  name: 'v-tiptap-menu',
  mixins: [VMenu],
  computed: {
    calculatedLeft() {
      const menuWidth = Math.max(
        this.dimensions.content.width,
        parseFloat(this.calculatedMinWidth),
      );
      return convertToUnit(
        this.calcXOverflow(this.dimensions.activator.left, menuWidth)
        - (menuWidth / 2),
      );
    },
  },
});
</script>
