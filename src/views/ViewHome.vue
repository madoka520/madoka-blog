<template>
  <madoka-line position="top" direction="level" :move="-200" :delay="0" />
  <madoka-line position="right" direction="vertical" :move="200" :delay="0" />
  <madoka-line
    position="bottom"
    direction="level"
    :move="-100"
    :default-pos="-0"
    :delay="0"
  />
  <madoka-line
    position="right"
    direction="vertical"
    :move="-100"
    :default-pos="-0"
    :delay="0"
  />
</template>
<script setup lang="ts">
import MadokaLine from "@/components/MadokaLine.vue";
</script>
<style scoped lang="less"></style>