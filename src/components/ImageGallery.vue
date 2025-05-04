<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { GalleryItem } from '@/lib/gallery-item.d.ts'

/**
 * Image gallery component that supports:
 * - Image navigation (next/previous)
 * - Zoom controls (in/out/reset)
 * - Rotation controls (clockwise/counter-clockwise/reset)
 * - Thumbnail navigation
 */

/**
 * Component props with a default empty items array
 */
 const props = withDefaults(defineProps<{ items: GalleryItem[] }>(), {
  items: () => [],
})

/**
 * State Management
 */
const currentIndex = ref(0)
const zoomLevel = ref(1)
const rotationDegree = ref(0)

/**
 * Computed Properties
 */
const totalImages = computed(() => props.items.length)
const currentImage = computed(() => {
  if (props.items.length === 0) return null
  return props.items[currentIndex.value]
})

/**
 * Reset image transformations when navigating between images
 */
watch(currentIndex, () => {
  zoomLevel.value = 1
  rotationDegree.value = 0
})

/**
 * Navigation Methods
 */
function nextImage() {
  if (totalImages.value === 0) return
  currentIndex.value = (currentIndex.value + 1) % totalImages.value
}

function prevImage() {
  if (totalImages.value === 0) return
  currentIndex.value = (currentIndex.value - 1 + totalImages.value) % totalImages.value
}

/**
 * Zoom Control Methods
 */
function zoomIn() {
  zoomLevel.value = Math.min(zoomLevel.value + 0.2, 3)
}

function zoomOut() {
  zoomLevel.value = Math.max(zoomLevel.value - 0.2, 0.5)
}

function resetZoom() {
  zoomLevel.value = 1
}

/**
 * Rotation Control Methods
 */
function rotateClockwise() {
  rotationDegree.value = (rotationDegree.value + 90) % 360
}

function rotateCounterClockwise() {
  rotationDegree.value = (rotationDegree.value - 90 + 360) % 360
}

function resetRotation() {
  rotationDegree.value = 0
}

/**
 * Resets all image transformations to their default values.
 */
 function resetAll() {
  resetZoom()
  resetRotation()
}
</script>

<template>
<div class="image-gallery">
    <div class="gallery-controls" v-if="totalImages > 0">
      <div class="zoom-controls">
        <v-btn icon @click="zoomOut"><v-icon>mdi-magnify-minus</v-icon></v-btn>
        <v-btn icon @click="resetZoom"><v-icon>mdi-magnify</v-icon></v-btn>
        <v-btn icon @click="zoomIn"><v-icon>mdi-magnify-plus</v-icon></v-btn>
      </div>

      <div class="rotate-controls">
        <v-btn icon @click="rotateCounterClockwise"><v-icon>mdi-rotate-left</v-icon></v-btn>
        <v-btn icon @click="resetRotation"><v-icon>mdi-refresh</v-icon></v-btn>
        <v-btn icon @click="rotateClockwise"><v-icon>mdi-rotate-right</v-icon></v-btn>
      </div>

      <div class="navigation-controls">
        <v-btn icon @click="prevImage"><v-icon>mdi-chevron-left</v-icon></v-btn>
        <span>{{ currentIndex + 1 }} / {{ totalImages }}</span>
        <v-btn icon @click="nextImage"><v-icon>mdi-chevron-right</v-icon></v-btn>
      </div>

      <v-btn @click="resetAll">Zurücksetzen</v-btn>
    </div>

    <div class="image-container">
      <div v-if="currentImage" class="image-wrapper">
        <img
          :src="currentImage.src"
          :alt="currentImage.title || 'Image'"
          class="gallery-image"
          :style="{
            transform: `scale(${zoomLevel}) rotate(${rotationDegree}deg)`,
            transition: 'transform 0.3s ease'
          }"
        />
      </div>
      <div v-else class="no-images">
        <p>Keine Bilder zum Anzeigen</p>
      </div>
    </div>

    <div class="thumbnails-container" v-if="totalImages > 0">
      <div
        v-for="(item, index) in props.items"
        :key="index"
        class="thumbnail"
        :class="{ active: index === currentIndex }"
        @click="currentIndex = index"
      >
        <img :src="item.thumbnail || item.src" :alt="`Thumbnail ${index + 1}`" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-gallery {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}


.gallery-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;
}

.zoom-controls, .rotate-controls, .navigation-controls {
  display: flex;
  align-items: center;
  gap: 5px;
}

.image-container {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  margin-bottom: 15px;
}

.image-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.gallery-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transform-origin: center;
}

.no-images {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #666;
}

.thumbnails-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border: 2px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
}

.thumbnail.active {
  border-color: var(--v-primary-base, #1976d2);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
