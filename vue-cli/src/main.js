import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);
const vm = app.mount('#app');

console.log(app);
console.log(vm.$data);
console.log(vm.$data.data1);
console.log(vm.data2);
