import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import { getUuid, STATE, DEFAULTS } from '../assets/js/common.js'

export default createStore({
    state () {
        return {
            roles: [
                { id: 1, name: 'Product Owner', estimates: false },
                { id: 2, name: 'Developer', estimates: true },
                { id: 3, name: 'Designer', estimates: true },
                { id: 4, name: 'QA', estimates: true },
            ],
            sessions: [
                { id: 1, 'name': 'ZatSuite', 'slug': 'suite' },
                { id: 2, 'name': 'ZatPark', 'slug': 'park' },
                { id: 3, 'name': 'ZatPermit', 'slug': 'permit' },
                { id: 4, 'name': 'ZatMobile', 'slug': 'mobile' },
            ],
            cards: [
                { number: 0, text: '?'},
                { number: 1, text: '1'},
                { number: 2, text: '2'},
                { number: 3, text: '3'},
                { number: 5, text: '5'},
                { number: 8, text: '8'},
                { number: 13, text: '13'},
                { number: 21, text: '21'},
            ],
            users: [],
            uuid: getUuid(),
            state: STATE.LOBBY,
            session: DEFAULTS.SESSION,
        }
    },
    getters,
    actions,
    mutations
})
