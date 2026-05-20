<template>
  <div
    v-madoka-move="{ enabled: () => true, onMove: Slice.onMove }"
    class="slice-window"
    :style="{
      left: `${xValue}px`,
      top: `${yValue}px`,
      width: `${width}px`,
      zIndex: props.zIndex,
      'aspect-ratio': ' 1 / 1',
    }"
  >
    <div
      class="slice-window__viewport"
      :style="{
        transform: `translate(${-xValue}px, ${-yValue}px)`,
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
const props = withDefaults(
  defineProps<{
    src: string;
    zIndex?: number;
    width?: number;
  }>(),
  {
    width: 300
  },
);

const xValue = defineModel("x", {
  default: 100
})

const yValue = defineModel("y", {
  default: 100
})

const Slice = (() => {
  const onMove = (deltaX: number, deltaY: number) => {
    xValue.value += deltaX;
    yValue.value += deltaY;
  };

  const s = reactive({

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
