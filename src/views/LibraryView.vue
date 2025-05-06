<script setup lang="ts">
import { ref } from 'vue'
import type { GalleryItem } from '@/lib/gallery-item.d.ts'
import DropField from '@/components/DropField.vue'
import ImageGallery from '@/components/ImageGallery.vue'

/**
 * Verarbeitet eine Liste von Dateien und liest deren Daten als Base64-URLs.
 * Jede Datei wird in ein Objekt umgewandelt, das Bilddaten enthält,
 * und dieses Objekt wird zum `items`-Array hinzugefügt.
 *
 * @param {FileList} fileList - Die Liste der zu verarbeitenden Dateien.
 *
 * Die Funktion führt folgende Schritte für jede Datei aus:
 * 1. Erstellt eine neue Instanz von `FileReader`.
 * 2. Liest die Datei als Base64-codierte Daten-URL mit `FileReader.readAsDataURL`.
 * 3. Nach erfolgreichem Laden wird ein Objekt mit folgenden Eigenschaften
 *    zum `items`-Array hinzugefügt:
 *    - `itemImageSrc`: Die Base64-codierte Daten-URL der Datei.
 *    - `thumbnailImageSrc`: Die gleiche Base64-codierte Daten-URL für Vorschaubilder.
 *    - `w`: Platzhalterwert für die Breite (auf 0 gesetzt).
 *    - `h`: Platzhalterwert für die Höhe (auf 0 gesetzt).
 */
function enumerate(fileList: FileList) {
  for (const file of fileList) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      items.value.push({
        itemImageSrc: reader.result as string,
        thumbnailImageSrc: reader.result as string,
        w: 0,
        h: 0,
      })
    }
  }
}

const items = ref<GalleryItem[]>([
  {
    itemImageSrc: 'https://www.schadensmeldung.digital/images/fuhrparkmanagerin.webp',
    thumbnailImageSrc: 'https://www.schadensmeldung.digital/images/fuhrparkmanagerin.webp',
    w: 0,
    h: 0,
    title: 'Will be used for caption',
  },
  {
    itemImageSrc: 'https://www.schadensmeldung.digital/images/logistik.webp',
    thumbnailImageSrc: 'https://www.schadensmeldung.digital/images/logistik.webp',
    w: 0,
    h: 0,
  },
  {
    itemImageSrc: 'https://www.schadensmeldung.digital/images/werkstatt.webp',
    thumbnailImageSrc: 'https://www.schadensmeldung.digital/images/werkstatt.webp',
    w: 0,
    h: 0,
  },
])
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
          <drop-field accept=".jpg,.jpeg,.png,.webp" @drop="enumerate"></drop-field>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title>Gallery</v-card-title>
        <v-card-text style="display: flex; justify-content: center;">
          <image-gallery :items="items"></image-gallery>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
