<script setup lang="ts">
import { ref } from 'vue'

/**
 * A reusable file upload component that supports both drag-and-drop
 * and traditional file selection. Validates files against accepted file extensions.
 */

const emit = defineEmits(['drop'])
const isDragging = ref(false)
const color = ref('indigo')
const uploader = ref<HTMLInputElement | null>(null)

const props = withDefaults(defineProps<{ accept: string }>(), {
  accept: '.jpg, .jpeg, .png, .webp',
})

const btnText = 'Datei wählen'
const cardText = 'Dateien hier ablegen'

function dragOver() {
  isDragging.value = true
}

function dragLeave() {
  isDragging.value = false
}

function onFileInput(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files) {
    handleFileList(input.files)
  }
}

function onFileDrop(event: DragEvent) {
  isDragging.value = false

  const files = event.dataTransfer?.files
  if (files) {
    handleFileList(files)
  }
}

/**
 * Process and validate the file list
 * Validates each file against accepted extensions and emits the 'drop' event
 *
 * @param {FileList} files List of files to process
 * @throws {Error} Throws an error if any file has an invalid extension
 */
function handleFileList(files: FileList) {
  for (const file of files) {
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
    const isAccepted = props.accept.includes(fileExtension)

    if (!isAccepted) {
      throw new Error('Invalid File')
    }
  }

  emit('drop', files)
}
</script>

<template>
  <v-card
    id="dropfield"
    class="mx-auto spaced contain"
    :variant="isDragging ? 'tonal' : 'outlined'"
    :color="color"
    @dragover.prevent="dragOver"
    @dragleave.prevent="dragLeave"
    @drop.prevent="onFileDrop($event)"
    max-width="500"
    max-height="100%"
  >
    <v-card-text>
      <v-row align="center" no-gutters>
        <v-col class="text-h2 d-flex justify-center" cols="12">
          <v-icon> mdi-paperclip </v-icon>
          <span>{{ cardText }}</span>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn variant="text" @click="uploader?.click()">
        {{ btnText }}
      </v-btn>
    </v-card-actions>

    <input
      name="file"
      ref="uploader"
      type="file"
      style="display: none"
      :accept="props.accept"
      @change="onFileInput"
      multiple
    />
  </v-card>
</template>

<style scoped>
.spaced {
  margin-bottom: 35px;
}

.contain {
  padding: 1em;
}
</style>
