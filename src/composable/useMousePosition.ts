import { onMounted, onUnmounted, ref, Ref } from "vue";

export function useMousePosition(): { x: Ref<number>; y: Ref<number> } {
  const x = ref(0);
  const y = ref(0);

  const updateMousePosition = (event: MouseEvent) => {
    x.value = event.clientX;
    y.value = event.clientY;
  };

  onMounted(() => {
    window.addEventListener("mousemove", updateMousePosition);
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", updateMousePosition);
  });

  return { x, y };
}
