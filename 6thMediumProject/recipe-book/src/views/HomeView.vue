<template>
  <main>
    <h1 class="text-2xl font-bold mb-4">Recipe Book</h1>
    <div>
      <input type="text" placeholder="Search recipes...." v-model="searchQuery" class="p-2 border rounded mb-4 w-full">
    </div>
    <RecipeList :recipes="filteredRecipes" />
  </main>
</template>

<script setup lang="ts">

  import RecipeList from '@/components/RecipeList.vue';
  import { useRecipeStore } from '@/stores/recipe';
  import { computed, ref } from 'vue';
  import { RouterLink } from 'vue-router';

  const recipeStore = useRecipeStore();
  const searchQuery = ref('');
  const filteredRecipes = computed(() => recipeStore.filteredRecipes(searchQuery.value))

</script>
