<script setup lang="ts">
import type { GalleryItem } from '@/lib/gallery-item.d.ts'

const props = defineProps({ images: Array as () => GalleryItem[] })

function handleGalleryClose() {
  setTimeout(() => {
    requestAnimationFrame(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
    })
  }, 0)
}
</script>

<template>
  <vue-picture-swipe
    class="my-gallery"
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
      @close="handleGalleryClose"
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
