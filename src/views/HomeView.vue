<script setup>
import ListPokemons from '@/components/ListPokemons.vue'
import { ref, onMounted, reactive, computed } from 'vue'
import CardPokemonSelected from '@/components/CardPokemonSelected.vue'

const baseURLSvg = ref(
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/',
)
const pokemons = ref([])
const searchPokemonField = ref('')
const pokemonSelected = reactive(ref(''))
const loading = ref(false)

onMounted(async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0') // 🔽 Reduced for performance
  const data = await response.json()
  pokemons.value = data.results
})

const pokemonFiltered = computed(() => {
  if (pokemons.value && searchPokemonField.value) {
    return pokemons.value.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchPokemonField.value.toLowerCase()),
    )
  }
  return pokemons.value
})

const selectPokemon = async (pokemon) => {
  loading.value = true
  try {
    const res = await fetch(pokemon.url)
    const data = await res.json()
    pokemonSelected.value = data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main>
    <div class="container mt-4">
      <div class="form-group mb-4">
        <label hidden for="searchPokemonField" class="form-label">Search..</label>
        <input
          v-model="searchPokemonField"
          type="text"
          class="form-control"
          id="searchPokemonField"
          placeholder="Search"
        />
      </div>

      <!-- 🔁 Main Layout: Left and Right Columns -->
      <div class="row card-list">
        <!-- Left: Selected Pokémon -->
        <div class="col-md-4 mb-3">
          <CardPokemonSelected
            v-if="pokemonSelected"
            :name="pokemonSelected.name"
            :xp="pokemonSelected.base_experience"
            :height="pokemonSelected.height"
            :img="pokemonSelected.sprites.other.dream_world.front_default"
            :loading="loading"
          />
        </div>

        <!-- Right: Pokémon list -->
        <div class="col-md-8">
          <div class="row">
            <div
              v-for="pokemon in pokemonFiltered"
              :key="pokemon.name"
              class="col-sm-6 col-lg-4 mb-3"
            >
              <ListPokemons
                :name="pokemon.name"
                :baseURLSvg="baseURLSvg + pokemon.url.split('/')[6] + '.svg'"
                @click="selectPokemon(pokemon)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.card-list {
  max-height: 450px;
  overflow-y: scroll;
}
</style>
