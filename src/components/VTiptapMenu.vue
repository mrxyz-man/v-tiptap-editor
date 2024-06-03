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

      // !Make easy in future
      const current = this.calcXOverflow(this.dimensions.activator.left, menuWidth) - menuWidth / 2;

      const min = this.attach ? this.attach.getBoundingClientRect().left : 0;
      const max = this.attach ? this.attach.getBoundingClientRect().right - menuWidth : 0;

      const output = current > min && current < max
        ? current
        : Math.abs(current > (min + max) / 2 ? max : min);

      return convertToUnit(output);
    },
  },
});
</script>
