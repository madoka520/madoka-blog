<template>
  <Transition @enter="s.handleEnter" @leave="s.handleLeave">
    <div
      v-if="s.innerShow"
      class="line"
      :class="props.direction"
      :style="s.style"
    />
  </Transition>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import type { MadokaLineProps } from '@/components/MadokaLine/types.ts'

const props = withDefaults(defineProps<MadokaLineProps>(), {
  delay: 2000,
  defaultPos: 0,
})

defineOptions({
  name: 'MadokaLine',
})

const handleEnter = (el: Element, done: () => void) => {
  if (props.direction === 'vertical') {
    gsap.fromTo(
      el,
      {
        x: 0,
        opacity: 0,
      },
      {
        x: props.move,
        opacity: 1,
        duration: 1,
        delay: props.delay / 1000,
        ease: 'power2.inOut',
        onComplete: done,
      },
    )

    return
  }

  gsap.fromTo(
    el,
    {
      y: 0,
      opacity: 0,
    },
    {
      y: props.move,
      opacity: 1,
      duration: 1,
      delay: props.delay / 1000,
      ease: 'power2.inOut',
      onComplete: done,
    },
  )
}

const handleLeave = (el: Element, done: () => void) => {
  if (props.direction === 'vertical') {
    gsap.to(el, {
      x: 0,
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: done,
    })

    return
  }

  gsap.to(el, {
    y: 0,
    opacity: 0,
    duration: 1,
    ease: 'power2.inOut',
    onComplete: done,
  })
}

const syncShow = () => {
  s.innerShow = props.show
}

const s = reactive({
  style: {} as any,

  innerShow: false,

  handleEnter,
  handleLeave,
  syncShow,
})

watch(
  () => props.show,
  () => {
    s.syncShow()
  },
)

onMounted(() => {
  s.style[props.position] = `${props.defaultPos}px`

  nextTick(() => {
    s.syncShow()
  })
})
</script>

<style scoped lang="less">
.line {
  position: fixed;

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
