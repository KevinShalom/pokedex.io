import { createStore } from 'vuex'
import favorites from './favorites.module';

export default createStore({
  modules: {
    favorites
  }
})
