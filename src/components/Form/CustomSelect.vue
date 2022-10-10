<template>
  <div class="custom-select">
    <div class="custom-select__label" v-if="label">
      {{ label }}
    </div>
    <div class="custom-select__selected-option" @click="toggle">
      <span>{{ selectedOption.name }}</span>
      <font-awesome-icon class="icon" icon="fas fa-chevron-down" />
    </div>
    <ul class="custom-select__options"
      :class="{ 'open': isOpen }"  
    >
      <li
        class="custom-select__option"
        v-for="(option, i) in options"
        :key="`k-${i}`"
        @click="selectOption(option)"
      >
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    label: {
      type: String,
      required: false
    },
    options: {
      type: Array,
      required: true
    },
    defaultOption: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      selectedOption: this.defaultOption,
      isOpen: false
    }
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option
      this.$emit('change', option.value)
      this.isOpen = false
    },
    toggle() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang="scss" scoped>

.custom-select {
  align-self: flex-start;
  margin-bottom: 12px;

  &__label {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #475569;
    margin-bottom: 4px;
  }

  &__selected-option {
    width: 200px;
    display: flex;
    background: #FFFFFF;
    border: 1px solid #CBD5E1;
    border-radius: 4px;
    padding: 12px 16px;
    cursor: pointer;

    & > span {
      flex-grow: 1;
      display: block;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #0F172A;
    }

    & > .icon {
      margin-left: 10px;
    }
  }

  &__options {
    display: none;
    background: #FFFFFF;
    border: 1px solid #CBD5E1;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
    border-radius: 5px;
    padding: 14px 0;
    margin-top: 8px;

    &.open {
      display: block;
    }
  }

  &__option {
    padding: 9px 18px;
    background-color: #fff;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #64748B;
    cursor: pointer;

    &:hover {
      background-color: #E8EDFB;
      color: #3460DC;
    }
  }

}

</style>