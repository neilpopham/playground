<template>
	<h1>Parent</h1>
	<h2>prop1: {{ prop1 }}</h2>
	<h2>prop2: {{ prop2 }}</h2>
	<Child :prop1="prop1" :prop2="prop2" prop3="baz" />
</template>

<script>
import Child from './Child.vue'

export default {
	props: ['prop1', 'prop2'],
  components: { Child }
}
</script>
