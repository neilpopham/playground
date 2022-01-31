import { Publish, Subscribe } from '../assets/js/ably.js'

export default {
    save({ getters }) {
        const user = getters.user;
        localStorage.setItem('user', JSON.stringify(user));
    },
    register({ commit, dispatch }, payload) {
        commit('register', payload);
        dispatch('save');
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
    join({ commit }, session) {
        console.log('join', session);
        commit('join', session);
        Subscribe.session();
        Publish.join();
    },
    session({ commit }, session) {
        console.log('session');
        commit('session', session);
    },
}
