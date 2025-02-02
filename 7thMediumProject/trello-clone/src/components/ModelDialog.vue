<template>
    <div v-if="isOpen" @keydown.esc="emit('close')" ref="modalElement" @click.self="emit('close')" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" role="dialog" aria-modal="true">
        <div class="bg-white p-5 rounded max-w-md w-full">
            <h2 class="text-xl font-bold mb-4">{{ mode === 'add' ?  'Add New card' : 'Edit Card' }}</h2>
            <input type="text" placeholder="Card Title" aria-label="Card Title" class="w-full p-2 mb-4 border rounded" ref="titleInput" v-model="localCard.title">

            <textarea class="w-full p-2 mb-4 border rounded" placeholder="Card Description" aria-label="Card Description" v-model="localCard.description"></textarea>

            <div class="flex justify-end gap-2">
                <button class="bg-gray-300 hover:bg-gray-200 text-black px-4 py-2 rounded" @click="emit('close')">Cancel</button>

                <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" @click="emit('save', localCard)">{{ mode === 'add' ? 'Add' : 'Save' }}</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import type { ICard } from '@/types';

const props = defineProps<{
    isOpen: boolean
    card: ICard | null
    mode: 'add' | 'edit'
}>()

const emit = defineEmits<{
    (e: 'close') : void
    (e: 'save', card: ICard) : void
}>()

const titleInput = ref<HTMLInputElement | null>(null);

const localCard = ref<ICard>({id: 0, title: '', description: ''})

watch(() => props.card, (newCard) => {
    if (newCard) {
        localCard.value = {...newCard}
    } else {
        localCard.value = {id: 0, title: '', description: ''}
    }
}, {immediate: true})

watch(() => props.isOpen, async (isOpen) => {
    if (isOpen) {
        await nextTick()
        activate()
        titleInput.value?.focus()
    } else {
        deactivate()
    }
})

const modalElement = ref<HTMLDivElement | null>(null);

const { activate, deactivate } = useFocusTrap(modalElement);

</script>