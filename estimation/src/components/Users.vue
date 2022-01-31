<template>
    <h1>{{ users.length }} {{ state }}</h1>
    <h2>Session: {{ session }}</h2>
    <h2>Estimates: {{ estimates.length }}</h2>
    <h2>Estimated: {{ estimated.length }}</h2>
    <h2>Can Reveal: {{ canReveal }}</h2>
    <h2>Avg: {{ average }}</h2>
    <button :disabled="!canReveal" class="btn" @click="revealEstimate">Reveal</button>
    <ul id="example-1">
        <li v-for="user in sorted" :key="user.uuid">
            {{ user }}
        </li>
    </ul>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import { STATE } from '../assets/js/common.js'

export default {
    computed: {
        canReveal() {
            if (this.$store.state.state == STATE.REVEALED) {
                return false;
            }
            const getters = this.$store.getters;
            return getters.estimates.length == getters.estimated.length;
        },
        ...mapState(['users', 'session', 'state']),
        ...mapGetters(['user', 'sorted', 'estimates', 'estimated', 'average'])
    },
    methods: {
        revealEstimate() {
            this.$store.dispatch('reveal');
        }
    }
}
</script>
