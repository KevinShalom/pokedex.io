<template>
  <header>
    <nav class="navbar">
      <div class="container">
        <ul>
          <li class="navbar-logo">
            <img src="../assets/pokeapi_256.png" alt="PokeApi" />
          </li>
          <li class="navbar-links">
            <a href="#">Total de favoritos: {{ countPokemons }}</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore();

    let countPokemons = computed(() => store.getters['favorites/countPokemons'])
    
    return {
      countPokemons
    }

  },
}
</script>

<style scoped>
.container {
  background-color: #F05454;
  padding-left: 1rem;
  padding-right: 1rem;
}
.navbar ul {
  display: flex;
  width: 100%;
  align-items: center;
  background-color: #F05454;
  color: #ffffff;
}
.navbar li {
  list-style-type: none;
  padding: 1rem;
}
.navbar a {
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
}
.navbar-logo {
  flex: 1;
  user-select: none;
}
.navbar-logo img {
  height: 40px;
}
.navbar-toggle {
  display: none;
}
</style>