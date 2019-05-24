import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
   tit: '132'
  },
  mutations: {
  	change(state,tit){
  		state.tit = tit.am
  	}
  }
});
 
export default store;