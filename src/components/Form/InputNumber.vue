<template>
  <div class="input-number">
    <input
      type="number"
      :max="max"
      min="0"
      :value="value"
      @input="validate($event)"
    >
    <span class="input-number__currency">{{ currency }}</span>
  </div>
</template>

<script>

export default {
  name: 'InputNumber',
  props: {
    value: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true
    }
  },
  methods: {
    validate(e) {
      const value = e.target.value;
      if (value > this.max) {
        e.target.value = this.max
      } else if (value < 0) {
        e.target.value = 0
      }
      this.$emit('input', e.target.value)
    }
  }
}

</script>

<style lang="scss" scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

.input-number {
  display: flex;
  & > input[type="number"] {
    flex-grow: 1;
    border: none;
    outline: none;
  }
  &__currency {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #94A3B8;
  }
}
</style>