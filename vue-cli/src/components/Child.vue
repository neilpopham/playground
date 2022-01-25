<template>
  <h2>Child</h2>
  <h3>prop1: {{ prop1 }}</h3>
  <h3>prop2: {{ prop2 }}</h3>
  <h3>prop3: {{ prop3 }}</h3>
</template>

<script>
export default {
  props: ['prop1', 'prop2', 'prop3']
}
</script>
