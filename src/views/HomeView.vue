<script setup>
import ListPokemons from '@/components/ListPokemons.vue'
import { ref, onMounted, reactive, computed } from 'vue'
import CardPokemonSelected from '@/components/CardPokemonSelected.vue'

const baseURLSvg = ref(
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/',
)
const pokemons = ref([])
const searchPokemonField = ref('')
const pokemonSelected = ref({
  name: '',
  base_experience: '-',
  height: '-',
  sprites: {
    other: {
      dream_world: {
        front_default: '/images/egg.png',
      },
    },
  },
})

const loading = ref(false)

onMounted(async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150&offset=0')
  const data = await response.json()

  // Fetch Japanese names for each Pokémon
  const enriched = await Promise.all(
    data.results.map(async (pokemon) => {
      const id = pokemon.url.split('/')[6]

      const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
      const speciesData = await speciesRes.json()
      const jpName =
        speciesData.names.find((n) => n.language.name === 'ja-Hrkt')?.name || pokemon.name

      return {
        ...pokemon,
        id,
        jaName: jpName,
      }
    }),
  )

  pokemons.value = enriched
})

const pokemonFiltered = computed(() => {
  if (pokemons.value && searchPokemonField.value) {
    const search = searchPokemonField.value.toLowerCase()
    return pokemons.value.filter(
      (pokemon) => pokemon.name.toLowerCase().includes(search) || pokemon.jaName?.includes(search),
    )
  }
  return pokemons.value
})

const selectPokemon = async (pokemon) => {
  loading.value = true
  try {
    const res = await fetch(pokemon.url)
    const data = await res.json()
    const id = data.id
    const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
    const speciesData = await speciesRes.json()

    const jpName = speciesData.names.find((n) => n.language.name === 'ja-Hrkt')?.name || data.name

    pokemonSelected.value = {
      ...data,
      japaneseName: jpName,
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main>
    <div class="container-fluid mt-4 px-3 px-md-4">
      <div class="form-group mb-4">
        <label hidden for="searchPokemonField" class="form-label">Search..</label>
        <input
          v-model="searchPokemonField"
          type="text"
          class="form-control"
          id="searchPokemonField"
          placeholder="ポケモン検索"
        />
      </div>

      <div class="row">
        <!-- Pokémon list: comes first on SP, second on desktop -->
        <div class="col-md-8 order-2 order-md-1 scrollable-list">
          <div class="row">
            <div v-for="pokemon in pokemonFiltered" :key="pokemon.name" class="col-6 col-sm-4 mb-3">
              <ListPokemons
                :name="pokemon.name"
                :jaName="pokemon.jaName"
                :baseURLSvg="baseURLSvg + pokemon.id + '.svg'"
                :isSelected="pokemon.name === pokemonSelected.name"
                @click="selectPokemon(pokemon)"
              />
            </div>
          </div>
        </div>

        <!-- Selected Pokémon: comes after list on SP, first on desktop -->
        <div class="col-md-4 order-1 order-md-2 mb-3">
          <CardPokemonSelected
            :name="pokemonSelected.japaneseName || pokemonSelected.name"
            :xp="pokemonSelected.base_experience"
            :height="pokemonSelected.height"
            :img="pokemonSelected.sprites?.other?.dream_world?.front_default || '/images/egg.png'"
            :loading="loading"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.scrollable-list {
  max-height: 450px;
  overflow-y: auto;
  padding-right: 12px;
  overflow-x: hidden;
}
</style>
