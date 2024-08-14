<script lang="ts">
import { defineComponent, VueElement, h } from "vue";

export default defineComponent({
  props: {
    icon: VueElement,
  },
  setup(props) {
    return () => h(props.icon);
  },
});
</script>
