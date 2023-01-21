import { createApp } from "vue";
import App from "./App.vue";
import { createStore } from 'vuex'

import "./assets/main.css";

// Create a new store instance.
const store = createStore({
    state () {
      return {
        employee: ''
      }
    },
    mutations: {
      set (state, name) {
        state.employee = name;
      }
    }
  })
  
// Install the store instance as a plugin
const app = createApp(App);
app.use(store)
app.mount("#app");


