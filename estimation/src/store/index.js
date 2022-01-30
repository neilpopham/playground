import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import { getUuid } from '../assets/js/common.js'

export default createStore({
    state () {
        return {
            users: [],
            uuid: getUuid(),
            state: 1,
            session: { slug: 'test' },
        }
    },
    getters,
    actions,
    mutations
})