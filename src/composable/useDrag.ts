import { onMounted, onUnmounted, ref } from "vue";

export function useDrag(onDrag: (deltaX: number) => void) {
  let lastX = ref(0);
  const isDragging = ref(false);

  const onMousedown = (event: MouseEvent) => {
    document.body.style.cursor = "col-resize";
    lastX.value = event.clientX;
    isDragging.value = true;
  };

  const onMousemove = (event: MouseEvent) => {
    if (isDragging.value) {
      const currentX = event.clientX;
      const deltaX = currentX - lastX.value;
      onDrag(deltaX);
      lastX.value = currentX;
    }
  };

  const stopDragging = () => {
    if (isDragging.value) {
      isDragging.value = false;
      document.body.style.cursor = "";
    }
  };

  onMounted(() => {
    window.addEventListener("mousemove", onMousemove);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("mouseleave", stopDragging);
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", onMousemove);
    window.removeEventListener("mouseup", stopDragging);
    window.removeEventListener("mouseleave", stopDragging);
  });

  return { onMousedown };
}
