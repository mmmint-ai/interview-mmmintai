<script setup lang="ts">
import type { GalleryItem } from '@/lib/gallery-item.d.ts'
import { ref } from "vue";

import Galleria from 'primevue/galleria';
const props = defineProps({ items: Array as () => GalleryItem[] })

const activeIndex = ref(0);
const responsiveOptions = ref([
  {
    breakpoint: '1024px',
    numVisible: 5
  },
  {
    breakpoint: '768px',
    numVisible: 3
  },
  {
    breakpoint: '560px',
    numVisible: 1
  }
]);
const displayCustom = ref(false);
const imageClick = (index) => {
  activeIndex.value = index;
  displayCustom.value = true;
  if (props.items) {
    for (const item of props.items) {
      console.log(item);
    }
  }
};


</script>

<template>
  <div class="card">
    <Galleria v-model:activeIndex="activeIndex" v-model:visible="displayCustom" :value="props.items"
      :show-thumbnails="false" :responsiveOptions="responsiveOptions" :fullScreen="true" :numVisible="5"
      containerStyle="max-width: 850px" :circular="true" :showItemNavigators="true" :pt="{
        nextIcon: {
          style: {
            color: 'white'
          }
        },
        prevIcon: {
          style: {
           color: 'white'
          }
        },
        prevButton: {
          class: 'custom-prev-button',
          style: {
            width: '50px', height: '50px', background: 'rgba(255,255,255,0.5)', borderRadius: '30px'
          }
        },
        nextButton: {
          class: 'custom-next-button',
          style: {
            width: '50px', height: '50px', background: 'rgba(255,255,255,0.5)', borderRadius: '30px'
          }
        }
      }">
      <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
      </template>
      <template #thumbnail="slotProps">
        <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="display: block"/>
      </template>
    </Galleria>

    <div v-if="props.items" class="grid grid-cols-12 gap-4" >
      <div v-for="(image, index) of props.items" :key="index" class="col-span-4">
        <img :src="image.thumbnailImageSrc" style="cursor: pointer; max-width: 400px;"
          @click="imageClick(index)" />
      </div>
    </div>
  </div>
</template>

