import { Publish, Subscribe } from '../assets/js/ably.js'

export default {
    register({ commit, state }, name, role) {
        commit('register', name, role);
        commit('save');
    },
    pick({ commit, state }, card) {
        console.log('pick', card);
        commit('selectCard', card);
    },
    reset({ commit }) {
        console.log('reset');
        Publish.reset();
    },
    reveal({ commit }) {
        console.log('reveal');
        Publish.reveal();
    },
    leave({ commit }) {
        console.log('leave');
        commit('leave');
    },
}
