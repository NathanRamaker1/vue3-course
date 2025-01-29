<template>
  <SectionCard>
    <div class="flex justify-between">
      <div class="flex space-x-2">
        <div>{{ title }} - Status: </div>
        <div><component :is="icon" :class="{ 'animate-spin text-orange-400': pending, 'text-green-600':  confirmed}"/></div>
      </div>
      <RoundButton variant="danger" @click="$emit('cancelled')"> Cancel </RoundButton>
    </div>
  </SectionCard>
</template>

<script setup>
  import SectionCard from '@/components/SectionCard.vue';
  import RoundButton from '@/components/RoundButton.vue';
  import { LoaderCircle, Check } from 'lucide-vue-next';
  import { computed } from 'vue';

  const props = defineProps({
    title: String,
    status: String
  });

  const pending = computed(() => props.status === 'pending');
  const confirmed = computed(() => props.status === 'confirmed');

  const icon = computed(() => (pending.value ? LoaderCircle : Check));
  defineEmits(['cancelled']);
</script>
