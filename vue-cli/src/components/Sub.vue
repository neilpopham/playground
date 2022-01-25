<template>
  <h1>Sub</h1>
  <h2>prop1: {{ prop1 }}</h2>
  <h2>prop2: {{ prop2 }}</h2>
  <p>Slot: <slot /></p>
</template>

<script>
export default {
  props: ['prop1', 'prop2']
}
</script>
