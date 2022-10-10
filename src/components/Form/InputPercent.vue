<template>
  <div class="input-percent">
    <div class="input-percent__less" @click="less">
      <font-awesome-icon icon="fas fa-minus" size="xs" />
    </div>
    <div class="input-percent__percent">
      {{ value }}%
    </div>
    <div class="input-percent__more" @click="more">
      <font-awesome-icon icon="fas fa-plus" size="xs" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'InputPercent',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    more() {
      if (this.value % 1 !== 0) {
        this.$emit('change', Math.ceil(this.value));
        return
      }
      const newValue = this.value + 1
      this.$emit('change', newValue);
    },
    less() {
      const newValue = (this.value - 1)
      if (newValue <= 0) return

      if (this.value % 1 !== 0) {
        this.$emit('change', Math.floor(this.value));
        return
      }
      this.$emit('change', newValue);
    }
  }
}

</script>

<style lang="scss" scoped>
.input-percent {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  &__less,
  &__more {
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F8FAFC;
    border-radius: 100%;
    border: 1px solid #3460DC;
    color: #3460DC;
    cursor: pointer;
  }

  &__percent {
    margin: 0 10px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #0F172A;
  }
}
</style>