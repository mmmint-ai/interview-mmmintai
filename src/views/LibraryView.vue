<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { GalleryItem } from '@/lib/gallery-item.d.ts'
import DropField from '@/components/DropField.vue'
import ImageGallery from '@/components/ImageGallery.vue'
import DamageProcessTimeline from '@/components/DamageProcessTimeline.vue'
import { openDB, type IDBPDatabase } from 'idb'

const images = ref<GalleryItem[]>([])

const sortedImages = computed(() => {
  return [...images.value].sort((a, b) => a.index - b.index)
})

let imageDB: IDBPDatabase | null = null

onMounted(async () => {
  imageDB = await openDB('ImageGallery', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('images')) {
        db.createObjectStore('images', { keyPath: 'id' })
      }
    }
  })

  const stored = await imageDB.getAll('images')

  for (const entry of stored) {
    setTimeout(() => {
      const url = URL.createObjectURL(entry.file)
      images.value.push({
        id: entry.id,
        index: entry.index,
        src: url,
        thumbnail: url,
        w: 0,
        h: 0,
        title: entry.name,
      })
    }, 0)
  }
})

async function handleImageDrop(files: File[]) {
  if (!Array.isArray(files) || !files.length) {
    console.warn('No valid files received.')
    return
  }

  if (!imageDB) return

  for (const file of files) {

    if (!file.type.startsWith('image/')) {
      console.warn('Skipped non-image file:', file.name)
      continue
    }

    const id = crypto.randomUUID()
    const index = images.value.length

    await imageDB.put('images', {
      id,
      name: file.name,
      file,
      index
    })

    const url = URL.createObjectURL(file)
    images.value.push({
      id,
      index,
      src: url,
      thumbnail: url,
      w: 0,
      h: 0,
      title: file.name,
    })
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
          <drop-field @drop="handleImageDrop" accept="image/*" />
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title>Gallery</v-card-title>
        <v-card-text>
          <image-gallery :images="sortedImages"></image-gallery>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-text>
          <damage-process-timeline />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
