import { ref, onMounted } from "vue";

export default () => {
  const currentTheme = ref<string>("light");

  const initTheme = (): void => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      currentTheme.value = storedTheme;
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      currentTheme.value = "dark";
    }
    updateTheme();
  };

  const updateTheme = (): void => {
    const el = document.documentElement;
    el.classList.toggle("dark", currentTheme.value === "dark");
    el.classList.toggle("light", currentTheme.value === "light");
    el.setAttribute("data-theme", currentTheme.value);
    localStorage.setItem("theme", currentTheme.value);
  };

  const switchTheme = (): void => {
    currentTheme.value = currentTheme.value === "light" ? "dark" : "light";
    updateTheme();
  };

  onMounted(initTheme);

  return {
    currentTheme,
    switchTheme,
  };
};
