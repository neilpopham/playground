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
