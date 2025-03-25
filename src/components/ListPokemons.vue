<script setup>
const props = defineProps(['name', 'baseURLSvg'])
</script>

<template>
  <div class="card p-2 text-center cardListPokemon">
    <h5 class="card-title text-capitalize">{{ props.name }}</h5>
    <img :src="baseURLSvg" alt="" height="80" />
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
