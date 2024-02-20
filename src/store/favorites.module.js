
const state = {
  favorites: []
}

const actions = {
  addFavorites({ state, commit }, pokemon) {
    const isFavorite = state.favorites.map(u => u.name).indexOf(pokemon.name);
    if (isFavorite >= 0) {
      commit('deletePokemon', isFavorite)
    } else {
      commit('pushPokemon', pokemon)
    }
  }
}

const mutations = {
  pushPokemon(state, pokemon) {
    state.favorites.push(pokemon)
  },
  deletePokemon(state, isFavorite) {
    state.favorites.splice(isFavorite, 1)
  }
}

const getters = {
  countPokemons(state) {
    return state.favorites.length
  }
}


export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}