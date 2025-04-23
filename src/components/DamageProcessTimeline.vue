<script setup lang="ts">
import { ref } from 'vue'

const steps = [
  {
    type: "CALL_RECEIVED",
    title: "Schadenmeldung telefonisch eingegangen",
    timestamp: "2025-04-10T08:45:00Z",
    contact: "Max Mustermann",
    status: "erfasst",
    location: "Kundencenter Berlin",
    comment: "Kratzer am Stoßfänger gemeldet.",
    referenceId: "CALL-001",
    amount: 0,
    caseID: "001"
  },
  {
    type: "IMAGES_RECEIVED",
    title: "Schadenbilder übermittelt",
    timestamp: "2025-04-10T10:05:00Z",
    contact: "Max Mustermann",
    status: "eingegangen",
    location: "Upload-Portal",
    comment: "4 Bilder vom Fahrzeugheck.",
    caseID: "001"
  },
  {
    type: "KVA_REQUESTED",
    title: "KVA angefragt",
    timestamp: "2025-04-10T11:30:00Z",
    contact: "Autohaus Meier",
    status: "angefragt",
    location: "Wolfsburg",
    comment: "Bitte Rückmeldung bis 12.04.",
    caseID: "001"
  },
  {
    type: "KVA_RECEIVED",
    title: "KVA erhalten",
    timestamp: "2025-04-11T14:22:00Z",
    contact: "Autohaus Meier",
    status: "eingegangen",
    location: "System",
    comment: "KVA mit 6 Positionen.",
    referenceId: "KVA-001",
    caseID: "001"
  },
  {
    type: "LEASE_APPROVAL",
    title: "Freigabe Leasing",
    timestamp: "2025-04-12T09:00:00Z",
    contact: "Leasing AG",
    status: "freigegeben",
    location: "Onlineportal",
    comment: "Genehmigt bis 2000 EUR.",
    referenceId: "LEASE-APP-001",
    caseID: "001"
  },
  {
    type: "FLEET_APPROVAL",
    title: "Freigabe Fuhrparkmanager",
    timestamp: "2025-04-12T11:45:00Z",
    contact: "Sven Fuhrmann",
    status: "freigegeben",
    location: "intern",
    comment: "Rückmeldung an Fahrer erfolgt.",
    referenceId: "FLEET-APP-001",
    caseID: "001"
  },
  {
    type: "INSURANCE_APPROVAL",
    title: "Freigabe Versicherung",
    timestamp: "2025-04-13T08:30:00Z",
    contact: "AllSecure Versicherung",
    status: "freigegeben",
    location: "Versicherungsportal",
    comment: "Schadennummer AS-2025-38217",
    referenceId: "INS-APP-001",
    caseID: "001"
  },
  {
    type: "WORKSHOP_APPOINTMENT",
    title: "Werkstatttermin vereinbart",
    timestamp: "2025-04-13T15:20:00Z",
    contact: "Autohaus Meier",
    status: "terminiert",
    location: "Wolfsburg",
    comment: "Termin am 16.04. um 09:00",
    referenceId: "TERM-001",
    caseID: "001"
  },
  {
    type: "REPAIRED",
    title: "Auto repariert",
    timestamp: "2025-04-17T17:00:00Z",
    contact: "Autohaus Meier",
    status: "abgeschlossen",
    location: "Wolfsburg",
    comment: "Stoßfänger und Kennzeichenhalter ersetzt.",
    caseID: "001"
  },
  {
    type: "PROCESS_COMPLETED",
    title: "Vorgang abgeschlossen",
    timestamp: "2025-04-18T10:00:00Z",
    contact: "Lea Abwicklung",
    status: "geschlossen",
    location: "intern",
    comment: "Fahrzeug übergeben und dokumentiert.",
    caseID: "001"
  }
]

function getCaseID(): string {
  return steps.length > 0 ? steps[steps.length - 1].caseID : ''
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleString('de-DE', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

function getStepIcon(status: string): string {
  if (['eingegangen', 'freigegeben', 'abgeschlossen', 'geschlossen', 'erfasst'].includes(status)) {
    return 'mdi-check-circle'
  } else if (status === 'terminiert') {
    return 'mdi-alert-circle'
  } else if (status === 'angefragt') {
    return 'mdi-help-circle'
  }
  return 'mdi-progress-clock'
}

function getStepColor(status: string): string {
  if (['eingegangen', 'freigegeben', 'abgeschlossen', 'geschlossen', 'erfasst'].includes(status)) {
    return 'green'
  } else if (status === 'terminiert') {
    return 'red'
  } else if (status === 'angefragt') {
    return 'orange'
  }
  return 'grey'
}
</script>

<template>
  <h2 class="text-h6 mb-4">Prozessverlauf – Vorgang {{ getCaseID() }}</h2>
  <v-timeline align="start" dense>
    <v-timeline-item
      v-for="(step, index) in steps"
      :key="step.type"
      :dot-color="getStepColor(step.status)"
      :icon="getStepIcon(step.status)"
      icon-color="white"
      fill-dot
    >
      <template #opposite>
        <strong>{{ formatDate(step.timestamp) }}</strong>
      </template>
      <v-card
        :style="index === steps.length - 1 ? `border: 3px solid ${getStepColor(step.status)}` : ''"
      >
        <v-card-title class="text-h6">{{ step.title }}</v-card-title>
        <v-card-text>
          <div><strong>Status:</strong> {{ step.status }}</div>
          <div><strong>Kontakt:</strong> {{ step.contact }}</div>
          <div><strong>Ort:</strong> {{ step.location }}</div>
          <div><strong>Kommentar:</strong> {{ step.comment }}</div>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>
