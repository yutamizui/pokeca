<script setup>
const pokemon = defineProps(['name', 'xp', 'height', 'img', 'loading'])
</script>
<template>
  <div class="card cardPokemonSelected">
    <h1 :class="pokemon.loading ? '' : 'animate__animated animate__flipInY'">
      <img
        v-if="pokemon.name"
        :src="pokemon.img"
        height="250"
        class="card-img-top pt-2"
        alt="pokemon.name"
      />
      <img v-else src="/images/egg.png" height="250" class="card-img-top pt-2" alt="pokemon.name" />
    </h1>
    <div class="card-body">
      <h5 class="card-title text-center">{{ pokemon.name }}</h5>
      <hr />
      <div class="row">
        <section class="col">
          <strong>XP:</strong>
          <span>{{ pokemon.xp }}</span>
        </section>
        <section class="col">
          <strong>XP:</strong>
          <span>{{ pokemon.height }}</span>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cardPokemonSelected {
  background: rgb(55, 97, 250);
  background: linear-gradient(90deg, rgba(235, 192, 37, 0.4) 0%, rgba(255, 209, 70, 0.1) 55%);
}
</style>
