import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import './index.css'
import { Publish, Subscribe } from './assets/js/ably.js'
import { getUuid } from './assets/js/common.js'

// Create a new store instance.
window.store = createStore({
    state () {
        return {
            users: [],
            uuid: getUuid(),
        }
    },
    getters: {
        user (state) {
            const user = state.users.find(u => u.uuid == state.uuid);
            console.log('getters.user', user);
            return user;
        },
        sorted (state) {
            return state.users.sort((a, b) => a.name < b.name ? -1 : 1);
        }
    },
    mutations: {
        add(state, user) {
            state.users.push(user);
        },
        clear(state) {
            state.users = [];
        },
        upsert(state, user) {
            const i = state.users.findIndex(u => u.uuid == user.uuid);
            if (i == -1) {
                state.users.push(user);
            } else {
                state.users[i] = user;
            }
        },
        remove(state, user) {
            const i = state.users.findIndex(u => u.uuid == user.uuid);
            if (i > -1) {
                delete state.users[i];
            }
        },
        pick(state, user) {
            const i = state.users.findIndex(u => u.uuid == user.uuid);
            if (i > -1) {
                state.users[i] = user;
            }
        },
        reveal(state) {
            
        },
        reset(state, session) {
            state.users.foreach(u => u.session[session].card = null)
        },                        
    }
});

const app = createApp(App);
app.use(store);
const vm = app.mount('#app');

//app.$store.users.push({ uuid: getUuid(), name: getUuid() });
store.commit('add', { uuid: getUuid(), name: getUuid(), role: { id: 1, name: 'Role' } });

Subscribe.session();
Publish.join();
