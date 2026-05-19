import type { Directive } from 'vue'

export default {
  mounted(el, binding) {
    let lastX = 0;
    let lastY = 0;

    const onMouseDown = (e: MouseEvent) => {
      const enabled = binding.value.enabled;

      if (!enabled) return;
      if (!enabled()) return;

      lastX = e.screenX;
      lastY = e.screenY;

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      const deltaX = e.screenX - lastX;
      const deltaY = e.screenY - lastY;

      lastX = e.screenX;
      lastY = e.screenY;

      binding.value?.onMove?.(deltaX, deltaY);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    el.addEventListener("mousedown", onMouseDown);
  },
} as Directive<HTMLElement>;
