<template>
  <div class="demo">
    <madoka-view-slice
      v-for="item in s.list"
      :src="item.src"
      :zIndex="item.zIndex"
      @mousedown="onClick(item)"
    />
  </div>
</template>

<script setup lang="ts">
import MadokaViewSlice from "@/components/MadokaViewSlice.vue";
import kami1 from "@/assets/images/picture-album/kami_1.webp";
import kami5 from "@/assets/images/picture-album/kami_5.webp";

const onClick = (item) => {
  s.list.forEach((item) => {
    item.zIndex = 0;
  });
  item.zIndex++;
};

const s = reactive({
  list: [
    { src: kami1, zIndex: 0 },
    { src: kami5, zIndex: 0 },
  ],
});
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