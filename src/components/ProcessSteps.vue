<template>
  <div class="step-card">
    <!-- Title and Date -->
    <div class="step-header">
      <h3 class="step-title">{{ title }}</h3>
      <div class="date-badge">📅 {{ formattedTimestamp }}</div>
    </div>

    <!-- Contact -->
    <div>
      <h4 class="section-label">Kontakt:</h4>
      <p class="info-badge">{{ contact }}</p>
    </div>

    <!-- Comment -->
    <div>
      <h4 class="section-label">Kommentar:</h4>
      <p class="info-badge">{{ comment }}</p>
    </div>

    <!-- Status, Location, and ID -->
    <div class="step-footer">
      <div class="info-id">
        <p class="label">Status:</p>
        {{ status }}
      </div>

      <div class="info-id">
        📍
        <p>{{ location }}</p>
      </div>

      <div v-if="referenceId || amount !== undefined" class="info-id">
        <div v-if="referenceId">
          <p class="label">🆔</p>
          <p>{{ referenceId }}</p>
        </div>
        <div v-if="amount !== undefined">
          <p>{{ amount }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps<{
  type: string
  title: string
  timestamp: string
  contact: string
  status: string
  location: string
  comment: string
  referenceId?: string
  amount?: number
}>()

const formattedTimestamp = computed(() => {
  const date = new Date(props.timestamp)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${day}.${month}.${year}, ${hours}:${minutes}`
})
</script>

<style scoped>
.step-card {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
  max-width: 500px;
  margin: auto;
  box-shadow: 0 10px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.step-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.step-title {
  font-size: 1.2rem;
  color: #111827;
  margin: 0;
}

.date-badge {
  color: #374151;
  font-size: 0.85rem;
  padding: 6px 10px;
  background-color: #f3f4f6;
  border-radius: 8px;
}

.section-label {
  font-size: 1rem;
  margin: 0 0 4px 0;
  color: #374151;
}

.info-badge {
  background-color: #e5e7eb;
  color: #1f2937;
  width: fit-content;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.9rem;
}

.step-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.info-id {
  background-color: #e5e7eb;
  color: #111827;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label {
  font-weight: bold;
  margin: 0;
}
</style>
