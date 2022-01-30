const shared = {
	estimates(state) {
		return state.users.filter(u => u.role && u.role.estimates);
	},
	estimated(state) {
		const session = state.session.slug;
    	return state.users.filter(u => u.session[session] && u.session[session].card);
	}
}

export default {
    user(state) {
        const user = state.users.find(u => u.uuid == state.uuid);
        console.log('getters.user', user);
        return user;
    },
    sorted(state) {
        return state.users.sort((a, b) => a.name == b.name ? 0 : (a.name < b.name ? -1 : 1));
    },
    estimates(state) {
    	return shared.estimates(state);
    },
    estimated(state) {
    	return shared.estimated(state);
    },
    average(state) {
    	const session = state.session.slug;
    	const users = state.users.filter(u =>
    		u.session[session]
    			&& u.session[session].card
    			&& u.session[session].card.number > 0
    	);
    	if (users.length == 0) {
    		return 0;
    	}
    	const total = users.reduce((t, u) => t + u.session[session].card.number	, 0);
    	return Number(total/users.length).toFixed(1);
    },
}
