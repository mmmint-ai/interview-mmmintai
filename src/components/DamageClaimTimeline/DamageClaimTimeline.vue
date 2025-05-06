<script setup lang="ts">
import type { ProcessItem } from '@/lib/process-item.d.ts'
import dayjs from 'dayjs'

const props = defineProps<{
  items: ProcessItem[]
}>()
</script>

<template>
  <v-timeline align="start" side="end" size="default">
    <v-timeline-item v-for="(item, index) in props.items" :key="index" icon="mdi-check-network" fill-dot dot-color="green">
      
    </v-timeline-item>
  </v-timeline>
</template>
