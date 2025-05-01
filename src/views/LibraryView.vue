<script setup lang="ts">
import { ref, computed } from 'vue'
import type { GalleryItem } from '@/lib/gallery-item.d.ts'
import DropField from '@/components/DropField.vue'
import ImageGallery from '@/components/ImageGallery.vue'

 const galleryItems = ref<GalleryItem[]>([])

 const items = ref<GalleryItem[]>([
  {
    src: 'https://www.schadensmeldung.digital/images/fuhrparkmanagerin.webp',
    thumbnail: 'https://www.schadensmeldung.digital/images/fuhrparkmanagerin.webp',
    w: 0,
    h: 0,
    title: 'Will be used for caption',
  },
  {
    src: 'https://www.schadensmeldung.digital/images/logistik.webp',
    thumbnail: 'https://www.schadensmeldung.digital/images/logistik.webp',
    w: 0,
    h: 0,
  },
  {
    src: 'https://www.schadensmeldung.digital/images/werkstatt.webp',
    thumbnail: 'https://www.schadensmeldung.digital/images/werkstatt.webp',
    w: 0,
    h: 0,
  },
])

const allItems = computed(() => [...items.value, ...galleryItems.value])

/**
 * Handle dropped image files
 */
function handleFileDrop(files: FileList) {
  const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp']

  for (let i = 0; i < files.length; i++) {
    const file = files[i]

    if (!validImageTypes.includes(file.type)) {
      console.warn(`Skipping file ${file.name}: Not a supported image type`)
      continue
    }

    const fileUrl = URL.createObjectURL(file)

    const newItem: GalleryItem = {
      src: fileUrl,
      thumbnail: fileUrl,
      title: file.name,
      w: 0,
      h: 0,
    }

    const img = new Image()
    img.onload = () => {
      newItem.w = img.width
      newItem.h = img.height
      galleryItems.value.push(newItem)
    }
    img.src = fileUrl

  }
}
</script>

<template>
    <v-row>
    <v-col cols="12">
      <h1>Library</h1>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title>Drop Field</v-card-title>
        <v-card-text>
    <DropField
      accept=".jpg, .jpeg, .png, .webp"
      @drop="handleFileDrop" />
    </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title>Gallery</v-card-title>
        <v-card-text>
    <ImageGallery :items="allItems" />
     </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
