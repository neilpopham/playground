<template>
    <h1>{{ user }}</h1>
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
    }
}
</script>
