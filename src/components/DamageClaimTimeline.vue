<script setup lang="ts">
import type { ProcessItem } from '@/lib/process-item.d.ts'
import dayjs from 'dayjs'

const props = defineProps<{
  items: ProcessItem[]
}>()
</script>

<template>
  <v-timeline align="start" side="end" size="small">
    <v-timeline-item v-for="(item, index) in props.items" :key="index" fill-dot>
      <v-card style="width: 400px">
        <v-card-title :class="['text-subtitle-1', `bg-grey`]">
          {{ item.title }}
        </v-card-title>
        <v-card-text style="padding-top: 1rem; padding-bottom: 4px">
          <div class="d-flex flex-column ga-2">
            <div class="d-flex ga-2" v-if="item.contact">
              <v-icon icon="mdi-account-box-outline" color="info"></v-icon>
              <p>{{ item.contact }}</p>
            </div>
            <div class="d-flex ga-2" v-if="item.status">
              <v-icon icon="mdi-list-status" color="success"></v-icon>
              <p>{{ item.status }}</p>
            </div>
            <div class="d-flex ga-2" v-if="item.comment">
              <v-icon icon="mdi-comment-outline" color="info"></v-icon>
              <p>{{ item.comment }}</p>
            </div>
          </div>

          <div class="d-flex justify-space-between" style="margin-top: 1rem">
            <p class="text-grey text-caption">{{ dayjs(item.timestamp).fromNow() }}</p>
            <p class="text-grey text-caption">
              {{ dayjs(item.timestamp).format('DD.MM.YYYY HH:mm') }}
            </p>
          </div>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>
