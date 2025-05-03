<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ProcessItem } from '@/lib/process-item.dt.ts';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

const items = ref<ProcessItem[]>([
  {
    type: 'CALL_RECEIVED',
    title: 'Schadenmeldung telefonisch eingegangen',
    timestamp: '2025-04-10T08:45:00Z',
    contact: 'Max Mustermann',
    status: 'erfasst',
    location: 'Kundencenter Berlin',
    comment: 'Kratzer am Stoßfänger gemeldet.',
    referenceId: 'CALL-001',
    amount: 0,
  },
  {
    type: 'IMAGES_RECEIVED',
    title: 'Schadenbilder übermittelt',
    timestamp: '2025-04-10T10:05:00Z',
    contact: 'Max Mustermann',
    status: 'eingegangen',
    location: 'Upload-Portal',
    comment: '4 Bilder vom Fahrzeugheck.',
  },
  {
    type: 'KVA_REQUESTED',
    title: 'KVA angefragt',
    timestamp: '2025-04-10T11:30:00Z',
    contact: 'Autohaus Meier',
    status: 'angefragt',
    location: 'Wolfsburg',
    comment: 'Bitte Rückmeldung bis 12.04.',
  },
  {
    type: 'KVA_RECEIVED',
    title: 'KVA erhalten',
    timestamp: '2025-04-11T14:22:00Z',
    contact: 'Autohaus Meier',
    status: 'eingegangen',
    location: 'System',
    comment: 'KVA mit 6 Positionen.',
    referenceId: 'KVA-001',
  },
  {
    type: 'LEASE_APPROVAL',
    title: 'Freigabe Leasing',
    timestamp: '2025-04-12T09:00:00Z',
    contact: 'Leasing AG',
    status: 'freigegeben',
    location: 'Onlineportal',
    comment: 'Genehmigt bis 2000 EUR.',
    referenceId: 'LEASE-APP-001',
  },
  {
    type: 'FLEET_APPROVAL',
    title: 'Freigabe Fuhrparkmanager',
    timestamp: '2025-04-12T11:45:00Z',
    contact: 'Sven Fuhrmann',
    status: 'freigegeben',
    location: 'intern',
    comment: 'Rückmeldung an Fahrer erfolgt.',
    referenceId: 'FLEET-APP-001',
  },
  {
    type: 'INSURANCE_APPROVAL',
    title: 'Freigabe Versicherung',
    timestamp: '2025-04-13T08:30:00Z',
    contact: 'AllSecure Versicherung',
    status: 'freigegeben',
    location: 'Versicherungsportal',
    comment: 'Schadennummer AS-2025-38217',
    referenceId: 'INS-APP-001',
  },
  {
    type: 'WORKSHOP_APPOINTMENT',
    title: 'Werkstatttermin vereinbart',
    timestamp: '2025-04-13T15:20:00Z',
    contact: 'Autohaus Meier',
    status: 'terminiert',
    location: 'Wolfsburg',
    comment: 'Termin am 16.04. um 09:00',
    referenceId: 'TERM-001',
  },
  {
    type: 'REPAIRED',
    title: 'Auto repariert',
    timestamp: '2025-04-17T17:00:00Z',
    contact: 'Autohaus Meier',
    status: 'abgeschlossen',
    location: 'Wolfsburg',
    comment: 'Stoßfänger und Kennzeichenhalter ersetzt.',
  },
  {
    type: 'PROCESS_COMPLETED',
    title: 'Vorgang abgeschlossen',
    timestamp: '2025-04-18T10:00:00Z',
    contact: 'Lea Abwicklung',
    status: 'geschlossen',
    location: 'intern',
    comment: 'Fahrzeug übergeben und dokumentiert.',
  },
])

const activeStep = ref(0);

const formatDate = (timestamp: string): string => {
  return format(new Date(timestamp), 'dd.MM.yyyy, HH:mm', { locale: de });
};

const currentItem = computed(() => items.value[activeStep.value]);

const progressPercentage = computed(() => {
  return (activeStep.value / (items.value.length - 1)) * 100;
});

const isStepCompleted = (index: number): boolean => {
  return index < activeStep.value;
};

const isStepActive = (index: number): boolean => {
  return index === activeStep.value;
};

const getStepTypeDisplayName = (type: string): string => {
  const displayNames: Record<string, string> = {
    'CALL_RECEIVED': 'Anruf',
    'IMAGES_RECEIVED': 'Bilder',
    'KVA_REQUESTED': 'KVA Anfrage',
    'KVA_RECEIVED': 'KVA Eingang',
    'LEASE_APPROVAL': 'Leasing OK',
    'FLEET_APPROVAL': 'Fuhrpark OK',
    'INSURANCE_APPROVAL': 'Versicherung OK',
    'WORKSHOP_APPOINTMENT': 'Werkstatt',
    'REPAIRED': 'Repariert',
    'PROCESS_COMPLETED': 'Abgeschlossen'
  };

  return displayNames[type] || type;
};

const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    'erfasst': 'amber',
    'eingegangen': 'blue',
    'angefragt': 'purple',
    'freigegeben': 'green',
    'terminiert': 'orange',
    'abgeschlossen': 'green-darken-1',
    'geschlossen': 'grey'
  };

  return statusColors[status] || 'primary';
};
</script>


<template>
  <v-card class="process-timeline-card mx-auto" width="1200" elevation="4">
    <v-card-title class="text-h5 font-weight-bold">
      Schadensprozess Tracking
      <v-chip class="ml-2" :color="getStatusColor(currentItem.status)" small>
        {{ currentItem.status }}
      </v-chip>
    </v-card-title>

    <v-card-subtitle>
      Vorgang {{ currentItem.referenceId || 'N/A' }} | {{ formatDate(currentItem.timestamp) }}
    </v-card-subtitle>

    <v-divider></v-divider>

    <v-card-text>
      <div class="d-flex timeline-container">
        <div class="timeline-progress-container mr-16">
          <div class="timeline-progress-bar" :style="{ height: `${progressPercentage}%` }"></div>
          <div
            v-for="(item, index) in items"
            :key="index"
            class="timeline-step-indicator"
            :class="{
              'completed': isStepCompleted(index),
              'active': isStepActive(index),
              'future': !isStepCompleted(index) && !isStepActive(index)
            }"
            @click="activeStep = index"
          >
            <v-tooltip location="right" :text="item.title">
              <template v-slot:activator="{ props }">
                <div class="timeline-step-circle" v-bind="props">
                  <span class="timeline-step-title">{{ getStepTypeDisplayName(item.type) }}</span>
                </div>
              </template>
            </v-tooltip>
          </div>
        </div>

        <div class="timeline-details ml-16">
          <v-card variant="outlined" class="mb-3">
            <v-card-title class="d-flex align-center">
              <v-chip :color="getStatusColor(currentItem.status)" class="mr-3 text-white" label>
                {{ getStepTypeDisplayName(currentItem.type) }}
              </v-chip>
              {{ currentItem.title }}
            </v-card-title>

            <v-card-text>
              <v-row dense>
                <v-col cols="12" sm="6">
                  <v-list-item density="compact">
                    <template v-slot:prepend>
                      <v-icon size="small">mdi-clock-outline</v-icon>
                    </template>
                    <v-list-item-title class="text-body-2">{{ formatDate(currentItem.timestamp) }}</v-list-item-title>
                  </v-list-item>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-list-item density="compact">
                    <template v-slot:prepend>
                      <v-icon size="small">mdi-account</v-icon>
                    </template>
                    <v-list-item-title class="text-body-2">{{ currentItem.contact }}</v-list-item-title>
                  </v-list-item>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-list-item density="compact">
                    <template v-slot:prepend>
                      <v-icon size="small">mdi-map-marker</v-icon>
                    </template>
                    <v-list-item-title class="text-body-2">{{ currentItem.location }}</v-list-item-title>
                  </v-list-item>
                </v-col>

                <v-col cols="12" sm="6" v-if="currentItem.referenceId">
                  <v-list-item density="compact">
                    <template v-slot:prepend>
                      <v-icon size="small">mdi-pound</v-icon>
                    </template>
                    <v-list-item-title class="text-body-2">{{ currentItem.referenceId }}</v-list-item-title>
                  </v-list-item>
                </v-col>
              </v-row>

              <v-divider class="my-2"></v-divider>

              <v-row>
                <v-col cols="12">
                  <div class="text-body-2 comment-box">
                    <v-icon size="small" class="mr-1">mdi-comment-text-outline</v-icon>
                    {{ currentItem.comment }}
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <div class="d-flex justify-space-between align-center">
            <v-btn
              :disabled="activeStep === 0"
              variant="text"
              @click="activeStep--"
              size="small"
            >
              <v-icon start>mdi-chevron-left</v-icon>
              Zurück
            </v-btn>

            <v-chip-group>
              <v-chip
                v-for="(item, index) in items"
                :key="index"
                size="x-small"
                :class="{ 'active-step-chip': index === activeStep }"
                @click="activeStep = index"
              >
                {{ index + 1 }}
              </v-chip>
            </v-chip-group>

            <v-btn
              :disabled="activeStep === items.length - 1"
              variant="text"
              @click="activeStep++"
              size="small"
            >
              Weiter
              <v-icon end>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn color="primary" variant="text" prepend-icon="mdi-file-pdf-box">
        PDF Export
      </v-btn>
      <v-btn color="primary" variant="text" prepend-icon="mdi-share-variant">
        Teilen
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" variant="tonal">
        Alle Details anzeigen
      </v-btn>
    </v-card-actions>
  </v-card>
</template>


<style scoped>
.process-timeline-card {
  overflow: hidden;
  width: 1200px;
  max-width: 1200px;
  min-width: 1200px;
  }

.timeline-container {
  min-height: 320px;
  position: relative;
}

.timeline-progress-container {
  position: relative;
  width: 80px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.timeline-progress-bar {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  background-color: #1976d2;
  transition: height 0.3s ease;
  z-index: 1;
}

.timeline-step-indicator {
  position: relative;
  z-index: 2;
  margin: 10px 0;
  cursor: pointer;
}

.timeline-step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0e0e0;
  border: 2px solid #bdbdbd;
  transition: all 0.2s ease;
}

.timeline-step-indicator.completed .timeline-step-circle {
  background-color: #1976d2;
  border-color: #1565c0;
}

.timeline-step-indicator.active .timeline-step-circle {
  background-color: #ffffff;
  border-color: #1976d2;
  border-width: 3px;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.3);
  transform: scale(1.2);
}

.timeline-step-indicator.future .timeline-step-circle {
  background-color: #f5f5f5;
  border-color: #e0e0e0;
}

.timeline-step-title {
  position: absolute;
  left: 38px;
  font-size: 11px;
  white-space: nowrap;
  color: #424242;
  font-weight: 500;
}

.timeline-details {
  flex: 1;
  min-height: 300px;
  padding-top: 10px;
  justify-self: end;
}

.comment-box {
  background-color: #f5f5f5;
  padding: 8px 12px;
  border-radius: 4px;
  font-style: italic;
}

.active-step-chip {
  background-color: #1976d2 !important;
  color: white !important;
}
</style>
