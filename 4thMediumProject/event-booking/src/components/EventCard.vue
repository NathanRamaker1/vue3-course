<template>
  <SectionCard class="border-4 bg-gray-100 text-gray-900 rounded-md">
    <template #header>
      {{ title }}
    </template>

    {{ when }}

    <template #footer>
      <div class="space-y-4">
        <p>{{ description }}</p>
        <div class="flex justify-end">
          <RoundButton @click="$emit('register')"> Register </RoundButton>
        </div>
      </div>
    </template>
  </SectionCard>
</template>

<script setup>
defineProps({
  title: String,
  when: String,
  description: String
});

defineEmits(['register']);

import RoundButton from '@/components/RoundButton.vue';
import SectionCard from './SectionCard.vue';
</script>
