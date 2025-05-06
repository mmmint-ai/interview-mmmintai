<script setup lang="ts">
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'
import type { GalleryItem } from '@/lib/gallery-item'

const props = defineProps<{
  galleryID: string
  images: GalleryItem[]
}>()

const container = ref<HTMLElement | null>(null)
let lightbox: PhotoSwipeLightbox | null = null

async function initLightbox() {
  await nextTick()

  if (lightbox) {
    lightbox.destroy()
  }

  if (!container.value) return

  lightbox = new PhotoSwipeLightbox({
    gallery: `#${props.galleryID}`,
    children: 'a',
    zoom: true,
    pswpModule: () => import('photoswipe'),
  })

  lightbox.init()
}

watch(() => props.images, initLightbox, { immediate: true })

onBeforeUnmount(() => {
  if (lightbox) {
    lightbox.destroy()
    lightbox = null
  }
})
</script>

<template>
  <div :id="galleryID" ref="container" style="display: flex; gap: 8px; flex-wrap: wrap">
    <a
      v-for="(image, key) in images"
      :key="key"
      :href="image.src"
      :data-pswp-width="image.w"
      :data-pswp-height="image.h"
      target="_blank"
      rel="noreferrer"
    >
      <img :src="image.thumbnail" alt="" width="150" height="225" style="object-fit: cover" />
    </a>
  </div>
</template>
