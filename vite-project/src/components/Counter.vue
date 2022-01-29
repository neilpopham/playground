<template>
    Counter: {{ count }} <button @click="increment" class="btn">Increment</button>

    {{ countSquared }}
</template>

<script>
// in full builds helpers are exposed as Vuex.mapState
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {

    computed: {

        // local
        countSquared2() {
            return this.$store.getters.countSquared;
        },

        // mix this into the outer object with the object spread operator
        ...mapState([
            // map this.count to store.state.count
            'count'
        ]),
        ...mapGetters([
            'countSquared',
            // ...
        ])
    },

    /*
    computed: mapState([
        // map this.count to store.state.count
        'count'
    ]),
    */

    /*
    computed: {
        count () {
            return this.$store.state.count
        }
    },
    */

    /*
    computed: {
        localComputed () { },

        // mix this into the outer object with the object spread operator
        ...mapState({
            // arrow functions can make the code very succinct!
            count: state => state.count,

            // passing the string value 'count' is same as `state => state.count`
            countAlias: 'count',

            // to access local state with `this`, a normal function must be used
            countPlusLocalState (state) {
            return state.count + this.localCount
            }
        })
    },
    */

    methods: {
        increment() {
            this.$store.commit('increment');
            console.log(this.$store.state.count);
        }
    }
}
</script>