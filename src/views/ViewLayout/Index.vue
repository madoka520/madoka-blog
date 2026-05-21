<template>
  <div class="demo">
    <madoka-view-slice
      v-for="item in ViewSlice.list"
      v-model:x="item.x"
      v-model:y="item.y"
      :width="ViewSlice.viewSliceWidth"
      :src="item.src"
      :zIndex="item.zIndex"
      @mousedown="onClick(item)"
    />
  </div>
  <madoka-line
    v-for="item in Root.lineList"
    :show="!!Root.lineConfig[item.position]"
    :direction="item.direction"
    :move="item.move"
    :position="item.position"
    :delay="item.delay"
  />
  <router-view />
</template>
<script setup lang="ts">
import MadokaViewSlice from '@/components/MadokaViewSlice.vue'
import kami1 from '@/assets/images/picture-album/kami_1.webp'
import kami5 from '@/assets/images/picture-album/kami_5.webp'
import kami3 from '@/assets/images/picture-album/kami_3.webp'
import MadokaLine from '@/components/MadokaLine/Index.vue'
import type { MadokaLineProps } from '@/components/MadokaLine/types.ts'
import { useWheelRoute } from '@/views/ViewLayout/useWhellRoute.ts'

const route = useRoute()
useWheelRoute()

const onClick = (item: any) => {
  ViewSlice.list.forEach((item) => {
    item.zIndex = 0
  })
  item.zIndex++
}

onBeforeRouteUpdate((to, from) => {
  ViewSlice.move()

  return true
})

const ViewSlice = (() => {
  const move = () => {
    const firstItem = ViewSlice.list[0]
    const centerItem = ViewSlice.list[1]
    const lastItem = ViewSlice.list[ViewSlice.list.length - 1]

    const firstTargetX = window.innerWidth - ViewSlice.viewSliceWidth
    const centerTargetX = 0
    const lastTargetX = window.innerWidth - ViewSlice.viewSliceWidth

    const firstStartX = firstItem.x
    const centerStartX = centerItem.x
    const lastStartX = lastItem.x

    const duration = 600
    const startTime = performance.now()

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1)

      firstItem.x = firstStartX + (firstTargetX - firstStartX) * progress
      centerItem.x = centerStartX + (centerTargetX - centerStartX) * progress
      lastItem.x = lastStartX + (lastTargetX - lastStartX) * progress

      if (progress < 1) {
        requestAnimationFrame(animate)
        return
      }
    }

    requestAnimationFrame(animate)
  }

  const viewSliceWidth = computed(() => window.innerHeight / 3)
  const screenRight = computed(() => window.innerHeight - viewSliceWidth.value)
  const screenBottom = computed(() => window.innerHeight - viewSliceWidth.value)

  const s = reactive({
    viewSliceWidth,
    screenRight,
    move,
    list: [
      { src: kami1, zIndex: 0, x: 0, y: 0 },
      {
        src: kami5,
        zIndex: 0,
        x: window.innerWidth - 300,
        y: viewSliceWidth.value,
      },
      { src: kami3, zIndex: 0, x: 0, y: toRaw(screenBottom.value) },
    ],
  })

  return s
})()

const Root = (() => {
  const s = reactive({
    lineConfig: computed(
      () => route.meta.lineConfig as Record<string, MadokaLineProps>,
    ),
    lineList: [
      { position: 'top', direction: 'level', move: 100, delay: 0 },
      {
        position: 'bottom',
        direction: 'level',
        move: -100,
        delay: 0,
      },
      {
        position: 'right',
        direction: 'vertical',
        move: -100,
        delay: 0,
      },
    ] as MadokaLineProps[],
  })

  return s
})()
</script>
<style scoped lang="less">
.demo {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
