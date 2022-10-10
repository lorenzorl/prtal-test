<template>
  <div class="input-date">
    <div class="input-date__label" v-if="label">
      {{ label }}
    </div>
    <DatePicker
      :value="date"
      :prefix-class="prefix"
      format="DD/MM/YYYY"
      @change="(val) => $emit('change', val)"
    ></DatePicker>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/locale/es';

export default {
  name: 'InputDate',
  components: { DatePicker },
  props: {
    label: {
      type: String,
      required: false
    },
    date: {
      required: true
    },
    prefix: {
      type: String,
      required: false,
      default: 'mx'
    }
  }
}

</script>

<style lang="scss" scoped>
.input-date {
  &__label {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #94A3B8;
  }
}
</style>