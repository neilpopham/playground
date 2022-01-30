import getters from './getters'
import { getUuid } from '../assets/js/common.js'
import { Publish, Subscribe } from '../assets/js/ably.js'

export default {
    add(state, user) {
        state.users.push(user);
    },
    clear(state) {
        state.users = [];
    },
    upsert(state, user) {
        const i = state.users.findIndex(u => u.uuid == user.uuid);
        if (i == -1) {
            state.users.push(user);
        } else {
            state.users[i] = user;
        }
    },
    remove(state, user) {
        const i = state.users.findIndex(u => u.uuid == user.uuid);
        if (i > -1) {
            delete state.users[i];
        }
    },
    pick(state, user) {
        const i = state.users.findIndex(u => u.uuid == user.uuid);
        if (i > -1) {
            state.users[i] = user;
        }
    },
    reveal(state) {

    },
    reset(state) {
    	const session = state.session.slug;
        state.users.forEach(u => {
        	if (u.session[session] && u.session[session].card) {
        		u.session[session].card = null;
        	}
        })
    },
    selectCard(state, card) {
    	//const user = user(state); // getUser();
    	//const u = state.users.find(u => u.uuid == user.uuid);
    	//u.card = card;
    	//const user = getUser();
    	//const uuid = getUuid();
    	//let user = state.users.find(u => u.uuid == uuid);
    	const user = getters.user(state);
    	console.log('selectCard', user);
    	const session = state.session.slug;
    	if (user.session[session] == undefined) {
    		user.session[session] = {};
    	}
    	user.session[session].card = card;
    	Publish.pick(user);
    },
}
