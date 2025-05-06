<script setup lang="ts">
import type { ProcessItem } from '@/lib/process-item.d.ts'
import DamageClaimeTimelineItem from './DamageClaimeTimelineItem.vue';

const props = defineProps<{
  items: ProcessItem[]
}>()
</script>

<template>
  <v-timeline align="start" side="end" size="default">
    <v-timeline-item v-for="(item, index) in props.items" :key="index" icon="mdi-check-network" fill-dot dot-color="green">
      <DamageClaimeTimelineItem :item="item"/>
    </v-timeline-item>
  </v-timeline>
</template>
