import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import { Publish, Subscribe } from './assets/js/ably.js'
import { getUuid } from './assets/js/common.js'
import './index.css'

window.zatsuite = { store: store };

const app = createApp(App);
app.use(store);
const vm = app.mount('#app');

//app.$store.users.push({ uuid: getUuid(), name: getUuid() });
store.commit(
    'add',
    { uuid: getUuid(), name: getUuid(), role: { id: 1, name: 'Role' }, session: {} }
);

Subscribe.session();
Publish.join();
