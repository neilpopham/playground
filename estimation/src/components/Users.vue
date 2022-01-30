<template>
    <h1>{{ users.length }} {{ state }}</h1>
    <h2>Session: {{ session }}</h2>
    <h2>Estimates: {{ estimates.length }}</h2>
    <h2>Estimated: {{ estimated.length }}</h2>
    <h2>Can Reveal: {{ canReveal }}</h2>
    <h2>Avg: {{ average }}</h2>
    <ul id="example-1">
        <li v-for="user in sorted" :key="user.uuid">
            {{ user }}
        </li>
    </ul>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
    computed: {
        canReveal() {
            const getters = this.$store.getters; 
            return getters.estimates.length == getters.estimated.length;
        },
        ...mapState(['users', 'session', 'state']),
        ...mapGetters(['user', 'sorted', 'estimates', 'estimated', 'average'])
    }
}
</script>
