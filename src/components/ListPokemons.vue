<script setup>
const props = defineProps(['name', 'baseURLSvg', 'isSelected', 'jaName'])
</script>

<template>
  <div
    class="card p-2 text-center"
    :class="{ 'border-primary shadow': isSelected }"
    style="cursor: pointer"
  >
    <img :src="baseURLSvg" :alt="name" height="96" />
    <p class="text-capitalize mt-2">{{ jaName || name }}</p>
  </div>
</template>

<style scoped>
.cardListPokemon {
  background: rgb(55, 97, 250);
  background: linear-gradient(90deg, rgba(55, 97, 250, 0.4) 0%, rgba(70, 239, 255, 0.2) 55%);
  cursor: pointer;
}

.cardListPokemon:hover {
  background: rgb(55, 97, 250);
  background: linear-gradient(90deg, rgba(55, 97, 250, 0.4) 0%, rgba(60, 239, 255, 0.6) 55%);
  cursor: pointer;
}

.cardListPokemon img:hover {
  padding: 0.1rem;
}
</style>
