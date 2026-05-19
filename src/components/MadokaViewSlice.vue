<template>
  <div
    v-madoka-move="{ enabled: () => true, onMove: Slice.onMove }"
    class="slice-window"
    :style="{
      left: `${Slice.x}px`,
      top: `${Slice.y}px`,
      width: `${Slice.width}px`,
      height: `${Slice.height}px`,
      zIndex: props.zIndex,
    }"
  >
    <div
      class="slice-window__viewport"
      :style="{
        transform: `translate(${-Slice.x}px, ${-Slice.y}px)`,
      }"
    >
      <div
        class="slice-window__background"
        :style="{
          backgroundImage: `url(${props.src})`,
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string;
  zIndex?: number;
}>();

const Slice = (() => {
  const onMove = (deltaX: number, deltaY: number) => {
    s.x += deltaX;
    s.y += deltaY;
  };

  const s = reactive({
    x: 100,
    y: 100,

    width: 300,
    height: 300,

    onMove,
  });

  return s;
})();
</script>

<style scoped lang="less">
.slice-window {
  position: absolute;

  overflow: hidden;

  background: transparent;

  .slice-window__viewport {
    position: absolute;
    left: 0;
    top: 0;

    width: 100vw;
    height: 100vh;

    pointer-events: none;
  }

  .slice-window__background {
    width: 100%;
    height: 100%;

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
}
</style>
