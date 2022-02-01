import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import { Publish, Subscribe } from './assets/js/ably.js'
import { getUuid, DEFAULTS } from './assets/js/common.js'
import './index.css'

window.zatsuite = { store: store };

const USER_VERSION = 1;
let user = localStorage.getItem('user');
if (user != null) {
    user = JSON.parse(localStorage.getItem('user'));
}
console.log(user);
if ((user == null) || (user.version == undefined) || (user.version != USER_VERSION)) {
    user = {
        version: USER_VERSION,
        uuid: getUuid(),
        name: getUuid(),
        session: {},
        //role: store.state.roles[1],
    }
}
store.commit('add', user);

const app = createApp(App);
app.use(store);
const vm = app.mount('#app');

console.log(window.location.hash);

window.addEventListener("beforeunload", (e) => {
    store.dispatch('save');
    Publish.leave();
});

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
} else {
    document.documentElement.classList.remove('dark')
}
