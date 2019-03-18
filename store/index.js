import Vue from 'vue'
import Vuex from 'vuex'
import Book from './book.js'
import Base from './base.js'
import Home from './home.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    Home,
    Base,
    Book
  }
})
