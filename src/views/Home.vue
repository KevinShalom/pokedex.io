<template>
  <div>
    <div class="vld-parent">
      <loading
        v-model:active="isLoading"
        :can-cancel="false"
        :is-full-page="true"
      />
    </div>
    <form @submit.prevent="searchPokemon">
      <div class="flex-search">
        <div class="input-search">
          <input placeholder="Buscar pokemon..." type="text" v-model="search" />
        </div>
        <div class="input-submit">
          <input type="submit" value="Buscar" />
        </div>
      </div>
    </form>
    <div class="flex-buttons" style="margin-top: 2em">
      <div>
        <div class="buttons-container" style="margin: 0 auto">
          <a href="#" v-if="prevPage" @click.prevent="getPrevPokemons"
            >&larr;</a
          >
          <a href="#" v-if="nextPage" @click.prevent="getNextPokemons"
            >&rarr;</a
          >
        </div>
      </div>
    </div>
    <div class="flex" v-if="pokemons.length > 0">
      <Pokemon
        v-for="(pokemon, index) in pokemons"
        :pokemon="pokemon"
        :key="index"
      />
    </div>
    <div v-else>
      <p>No encontramos ningun pokemon :(</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import { ref } from "vue";
import Pokemon from "@/components/Pokemon";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: {
    Pokemon,
    Loading,
  },
  setup() {
    let pokemons = ref([]);
    let prevPage = ref(null);
    let nextPage = ref(null);
    let isLoading = ref(false);
    let url = ref("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0");
    let search = ref("");

    const getPokemons = async () => {
      isLoading.value = true;
      let response = await axios.get(url.value);
      prevPage.value = response.data.previous;
      nextPage.value = response.data.next;
      pokemons.value = response.data.results;
      isLoading.value = false;
    };

    const getNextPokemons = async () => {
      isLoading.value = true;
      let response = await axios.get(nextPage.value);
      prevPage.value = response.data.previous;
      nextPage.value = response.data.next;
      pokemons.value = response.data.results;
      isLoading.value = false;
    };

    const getPrevPokemons = async () => {
      isLoading.value = true;
      let response = await axios.get(prevPage.value);
      prevPage.value = response.data.previous;
      nextPage.value = response.data.next;
      pokemons.value = response.data.results;
      isLoading.value = false;
    };

    const searchPokemon = async () => {
      if (search.value == "" || search.value == null) {
        getPokemons();
      } else {
        try {
          isLoading.value = true;
          let response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${search.value.toLowerCase()}`
          );
          pokemons.value = [];
          nextPage.value = null;
          pokemons.value.push(response.data);
          isLoading.value = false;
        } catch (error) {
          console.log(error);
          pokemons.value = []
          throw error;
        }
      }
    };

    getPokemons();

    return {
      pokemons,
      isLoading,
      prevPage,
      nextPage,
      search,
      getPokemons,
      searchPokemon,
      getNextPokemons,
      getPrevPokemons
    };
  },
};
</script>

<style scoped>
.flex {
  margin-bottom: 2em;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
}

form {
  width: 100%;
}

.flex-buttons {
  display: flex;
  justify-content: center;
  align-content: space-between;
}

.flex-search {
  display: flex;
  justify-content: center;
  margin-top: 1em;
}

.flex-search div.input-search {
  width: 65%;
  text-align: center;
}

.flex-search div.input-search input {
  width: 100%;
  padding: 8px 5px;
  border-radius: 5px;
  border: 1px solid #cecece;
  font-size: 16px;
}

.flex-search div.input-submit {
  width: 25%;
  text-align: center;
}

.flex-search div.input-submit input {
  width: 85%;
  padding: 8px 5px;
  background-color: #30475e;
  color: white;
  border: 0;
  cursor: pointer;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 900;
}

.flex-buttons div {
  width: 50%;
  flex-grow: 1;
  text-align: right;
  padding: 10px 15px;
}
.flex-buttons div .buttons-container {
  width: 95%;
}
.flex-buttons div .buttons-container a {
  background-color: #30475e;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 10px;
  color: white;
}
</style>