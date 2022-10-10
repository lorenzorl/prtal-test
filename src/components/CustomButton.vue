<template>
  <button class="custom-button">
    {{ title }}
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

.custom-button {
  background-color: #1D4ED8;
  padding: 8px 12px;
  border-radius: 5px;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  text-align: right;
  letter-spacing: 0.02em;
  color: #F8FAFC;
  border: none;
  outline: none;
}

</style>