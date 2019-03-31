import { FETCH_LISTDATA } from "./actions.type";
import {
    FETCH_START, 
    FETCH_END
} from "./mutations.type";

import axios from 'axios';

const state = {
  listData: [],
  isLoading: true,
};

const getters = {
  isLoading(state) {
    return state.isLoading;
  },
  getListData(state) {
    return state.listData;
  }
};

const actions = {
  async [FETCH_LISTDATA]({ commit }) {
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
  
    commit(FETCH_END, response.data);
  },
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [FETCH_END](state, response) {
    state.isLoading = false;
    state.listData = response
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
