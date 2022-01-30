export default {
    user (state) {
        const user = state.users.find(u => u.uuid == state.uuid);
        console.log('getters.user', user);
        return user;
    },
    sorted (state) {
        return state.users.sort((a, b) => a.name < b.name ? -1 : 1);
    }
}