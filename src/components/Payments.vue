<template>
  <div class="payments">
    <header class="payments__header">
      <h2 class="payments__title">
        Pagos
        <font-awesome-icon class="icon" icon="fas fa-chevron-down" size="xs" />
      </h2>
      <ul class="payments__options">
        <li class="payments__option edit" v-if="isView" @click="changeMode(MODES.editing)">
          <span>Editar</span>
          <font-awesome-icon class="icon" icon="fas fa-pen" />
        </li>
        <li class="payments__option save" v-else-if="isEditing" @click="savePayments()">
          <span>Guardar</span>
        </li>
      </ul>
      <span class="payments__info">
        Por cobrar
        <b>{{ total }} UF</b>
      </span>
    </header>
    <main class="payments__main">
      <ul class="payments__list">
        <li class="payments__item" v-for="(payment, i) in payments" :key="`k-${i}`">
          <Payment
            :payment="payment"
            :isTheLast="i === (payments.length - 1)"
            :isTheFirst="i === 0"
            :index="i"
            @add-payment="(pos) => addPayment(pos)"
            :mode="mode"
          />
        </li>
      </ul>
    </main>
  </div>
</template>

<script>

import Payment from './Payment/Payment.vue';

const MODES = {
  editing: 'editing',
  view: 'view'
}

export default {
  name: "PaymentsCard",
  components: { Payment },
  props: {
    startingTotal: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      MODES,
      mode: MODES.view
    }
  },
  computed: {
    isEditing() {
      return this.mode === this.MODES.editing
    },
    isView() {
      return this.mode === this.MODES.view
    },
    payments() {
      return this.$store.state.payments.payments
    },
    total() {
      return this.$store.state.payments.total
    }
  },
  methods: {
    changeMode(mode) {
      this.mode = mode
    },
    savePayments() {
      this.$store.dispatch('updateAllPayments')
      this.changeMode(MODES.view)
    },
    addPayment(position) {
      const previousPaymentIndex = this.getPreviousPaymentIndex(position);

      this.$store.dispatch('addPayment', {
        previousPaymentIndex,
        position
      });

      this.changeMode(this.MODES.editing)
    },
    getPreviousPaymentIndex(position) {
      if (position === 0) return 0
      return position - 1
    },
    validatePosition(position) {
      return position == null ? this.payments.length - 1 : position;
    },
    round(numb) {
      return Math.round((numb + Number.EPSILON) * 10) / 10;
    }
  },
  created() {
    this.$store.dispatch('init', {
      total: this.startingTotal,
      currency: this.currency
    })
  }
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/variables";
@import "@/assets/scss/base/mixins";
.payments {
  background-color: #ffffff;
  border-radius: 8px;
  margin-top: 80px;

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #F1F5F9;
    padding: 25px;
    height: 76px;
  }

  &__title {
    flex-grow: 1;
    margin: 0;
    color: #3460DC;

    font-weight: 600;
    font-size: 23px;
    line-height: 28px;
    letter-spacing: -0.02em;
    
    @include tabletDown {
      font-size: 20px;
    }

    & > .icon {
      margin-left: 10px;
    }
  }

  &__options {
    margin-right: 25px;
    display: flex;
    align-items: center;
  }

  &__option {
    cursor: pointer;
    margin-left: 10px;

    &.edit {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: #3460DC;

      &>.icon {
        margin-left: 10px;
      }
    }

    &.save {
      background-color: #3460DC;
      color: #F8FAFC;
      padding: 8px 12px;
      border-radius: 5px;
    }
  }

  &__info {
    font-weight: 400;
    font-size: 23px;
    line-height: 28px;
    text-align: right;
    letter-spacing: -0.02em;
    color: #94A3B8;

    @include tabletDown {
      font-size: 16px;
    }

    &>b {
      font-weight: 600;
      color: #0F172A;
    }
  }

  &__main {
    padding: 25px;
    overflow-x: auto;
  }

  &__list {
    display: flex;
    justify-content: flex-start;
  }

  &__item {
    width: 25%;
    flex-shrink: 0;

    @include tabletDown {
      width: 33%;
    }
    @include mobileDown {
      width: 50%;
    }
    @include mobileSmDown {
      width: 100%;
    }
  }
}
</style>