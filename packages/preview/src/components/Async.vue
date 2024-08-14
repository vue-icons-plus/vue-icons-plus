<template>
  <div>
    <async-component v-for="component in components" :key="component.id" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      components: [],
    };
  },
  methods: {
    loadComponent(component) {
      const asyncImport = () => import(`@/components/${component}.vue`);
      return asyncImport()
        .then((comp) => {
          this.$options.components[component] = comp.default;
        })
        .catch((error) => {
          console.error(`Failed to load component: ${component}`, error);
        });
    },
    loadComponents() {
      // 假设componentsList是一个包含需要动态加载的组件名称的数组
      const componentsList = ["ComponentA", "ComponentB", "ComponentC"];
      componentsList.forEach((component) => {
        this.loadComponent(component).then(() => {
          this.components.push({ id: component, component });
        });
      });
    },
  },
  created() {
    this.loadComponents();
  },
};
</script>
