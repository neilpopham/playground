import getters from './getters'
import { getUuid, STATE, DEFAULTS } from '../assets/js/common.js'
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
    	if (user.uuid == state.uuid) {
    		return;
    	}
        const i = state.users.findIndex(u => u.uuid == user.uuid);
        if (i > -1) {
            delete state.users[i];
            state.users.splice(i, 1);
        }
    },
    pick(state, user) {
        const i = state.users.findIndex(u => u.uuid == user.uuid);
        if (i > -1) {
            state.users[i] = user;
        }
    },
    reveal(state) {
    	state.state = STATE.REVEALED;
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
    leave(state) {
    	const session = state.session.slug;
    	const user = getters.user(state);
    	if (user.session[session] && user.session[session].card) {
        	user.session[session].card = null;
        }
        //user.session = { [session]: {} };
        Publish.leave(user);
        state.state = 1;
        state.users = [user];
        state.session = DEFAULTS.SESSION;

    },
    register(state, payload) {
    	const user = getters.user(state);
    	user.name = payload.name;
    	user.role = payload.role;
    },
    join(state, session) {
    	state.session = session;
    	state.state = STATE.ESTIMATING;
    	state.session.state = STATE.ESTIMATING;
    	const user = getters.user(state);
    	user.session = { [session.slug]: {} };
    },
    session(state, status) {
    	state.session.state = status;
    }
}
