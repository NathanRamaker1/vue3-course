<template>
    <SectionCard>
        <div class="space-y-4 items-center flex flex-col">
            <div class=" text-red-500">
                <slot />
            </div>
            <RoundButton v-if="retry" @click="retry">Retry now</RoundButton>
        </div>
    </SectionCard>
</template>

<script setup>
    import SectionCard  from "@/components/SectionCard.vue";
    import RoundButton from "@/components/RoundButton.vue";

    defineProps({
        retry: {
            type: Function,
            required: false
        }
    });
</script>