import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import './index.css'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  getters: {
    countSquared (state) {
      return state.count * state.count
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
});

const app = createApp(App);

// Install the store instance as a plugin
app.use(store);

const vm = app.mount('#app');

const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
};
