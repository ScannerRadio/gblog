import Vue from "vue";
import Vuex from "vuex";
import config from "../script/config.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { config },
  mutations: {
    truename(state, truename) {
      state.config.truename = truename;
    }
  }
});
