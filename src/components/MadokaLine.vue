<template>
  <div
      class="line"
      :class="props.direction"
      :style="s.style"
  />
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
      direction: 'level' | 'vertical'
      move: number
      position: 'top' | 'left' | 'right' | 'bottom'
      defaultPos?: number
      delay?: number
    }>(),
    {

      delay: 2000,
      defaultPos: 100
    }
)

const s = reactive({
  style: {} as any
})

onMounted(() => {
  s.style[props.position] = `${props.defaultPos}px`
  setTimeout(() => {
    if (props.direction === 'vertical') {
      s.style.transform =
          `translateX(${props.move}px)`
      return
    }
    s.style.transform =
        `translateY(${props.move}px)`

  }, props.delay)
})
</script>

<style scoped lang="less">
.line {
  position: fixed;
  transition: transform 1000ms ease-in-out;

  &.level {

    width: 100%;
    height: 1px;

    background: #000;
  }

  &.vertical {

    top: 0;
    width: 1px;
    height: 100%;

    background: #000;
  }
}
</style>