<template>
    <h1>{{ user }}</h1>
    <!-- <h2>uu {{ uuid }}</h2> -->
    <button class="btn" @click="selectCard">Pick</button>
    <button class="btn" @click="resetCards">Reset</button>
    <button class="btn" @click="leaveSession">Leave</button>
    <button class="btn" @click="testRegister">Register</button>

</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
    computed: {
        uuid() {
            return this.$store.getters.user.uuid;
        },
        ...mapState(['users']),
        ...mapGetters(['user'])
    },
    methods: {
        selectCard() {
            this.$store.dispatch('pick', { id: 1, number: 8, text: 8 });
        },
        resetCards() {
            this.$store.dispatch('reset');
        },
        leaveSession() {
            this.$store.dispatch('leave');
        },
        testRegister() {
            this.$store.dispatch(
                'register',
                { name: 'Neil', role: { id: 3, name: 'Designer', estimates: true } }
            );
            this.$store.dispatch('join', this.$store.state.sessions[0]);
        },
        //...mapActions(['pick']),
        /*
        ...mapActions([
            'increment', // map `this.increment()` to `this.$store.dispatch('increment')`

            // `mapActions` also supports payloads:
            'incrementBy' // map `this.incrementBy(amount)` to `this.$store.dispatch('incrementBy', amount)`
        ]),
        ...mapActions({
            add: 'increment' // map `this.add()` to `this.$store.dispatch('increment')`
        })
        */
    }
}
</script>
