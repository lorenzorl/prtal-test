<template>
  <input
    type="text"
    :value="value"
    @input="$emit('input', $event.target.value)"
  >
</template>

<script>

export default {
  name: 'InputText',
  props: {
    value: {
      type: String,
      required: true
    },
  }
}

</script>

<style lang="scss" scoped>

</style>