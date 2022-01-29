<template>
    <h1>{{ users.length }} {{ count }}</h1>
    <ul id="example-1">
        <li v-for="user in sorted" :key="user.uuid">
            {{ user.name }}
        </li>
    </ul>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
    computed: {
        count() {
            return this.$store.state.users.length;
        },
        ...mapState(['users']),
        ...mapGetters(['user', 'sorted'])
    }
}
</script>
