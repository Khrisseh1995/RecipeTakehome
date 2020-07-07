import Vue from 'vue'
import Vuex from 'vuex'
import {RecipeModule} from './modules/RecipeModule';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    RecipeModule
  }
})