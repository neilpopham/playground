<template>
  <Parent prop1="parent-foo" :prop2="data1" />
  <Sub prop1="sub-foo" :prop2="data1">Sub slot content</Sub>
</template>

<script>
import Parent from './components/Parent.vue'
import Sub from './components/Sub.vue'

export default {
  name: 'App',
  components: { Parent, Sub },
  data() {
    return {
      posts: [
        { id: 1, title: 'My journey with Vue' },
        { id: 2, title: 'Blogging with Vue' },
        { id: 3, title: 'Why Vue is so fun' }
      ],
      data1: 'bar',
      data2: 'baz',
      data3: 'qux',
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
