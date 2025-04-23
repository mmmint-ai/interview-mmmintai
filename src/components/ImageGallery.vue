<script setup lang="ts">
import type { GalleryItem } from '@/lib/gallery-item.d.ts'

const props = defineProps({ images: Array as () => GalleryItem[] })
</script>

<template>
  <vue-picture-swipe
    class="my-gallery"
    ref="pictureSwipe"
    :items="props.images"
    :options="{
      shareEl: false,
      loop: true,
      pinchToClose: true,
      zoomEl: true,
      rotateEl: true,
      closeToScroll: false,
      closeOnVerticalDrag: true,
    }"
  ></vue-picture-swipe>
</template>

<style scoped>
::v-deep .my-gallery img {
  max-width: 300px;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>
