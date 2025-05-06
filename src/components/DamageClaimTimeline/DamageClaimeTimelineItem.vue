<script setup lang="ts">
import type { ProcessItem } from '@/lib/process-item.d.ts'
import dayjs from 'dayjs'
const props = defineProps<{
  item: ProcessItem
}>()

const item = props.item
const timestamp = dayjs(item.timestamp)
</script>

<template>
  <v-card style="width: 400px">
    <v-card-title
      :class="[
        'text-subtitle-1',
        `bg-grey`,
        'd-flex',
        'justify-space-between',
        'align-center',
        'ga-4',
      ]"
      style="width: 400px"
    >
      <p style="white-space: normal">{{ item.title }}</p>
      <p class="text-caption" style="white-space: nowrap" v-if="item.referenceId">
        {{ item.referenceId }}
      </p>
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

      <div class="d-flex justify-space-between text-caption text-grey" style="margin-top: 1rem">
        <p>{{ timestamp.fromNow() }}</p>
        <p>
          {{ timestamp.format('DD.MM.YYYY HH:mm') }}
        </p>
      </div>
    </v-card-text>
  </v-card>
</template>
