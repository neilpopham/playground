import { Publish, Subscribe } from '../assets/js/ably.js'

export default {
    pick({ commit, state }, card) {
        console.log('pick', card);
        commit('selectCard', card);
    },
    reset({ commit }) {
        console.log('reset');
        Publish.reset();
    },
}
