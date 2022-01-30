import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import { Publish, Subscribe } from './assets/js/ably.js'
import { getUuid, DEFAULTS } from './assets/js/common.js'
import './index.css'

window.zatsuite = { store: store };

const app = createApp(App);
app.use(store);
const vm = app.mount('#app');

console.log(window.location.hash);

const USER_VERSION = 1;
let user = localStorage.getItem('user');
if (user != null) {
    user = JSON.parse(localStorage.getItem('user'));
}
if ((user == null) || (user.version == undefined) || (user.version != USER_VERSION)) {
    user = {
        version: USER_VERSION,
        uuid: getUuid(),
        name: getUuid(),
        session: {},
        role: store.state.roles[1],
    }
}
store.commit('add', user);

window.addEventListener("beforeunload", (e) => {
    store.dispatch('save');
});


// TESTING
store.dispatch('save', DEFAULTS.SESSION);
Subscribe.session();
Publish.join();
