<template>
  <div class="payment">
    <div class="payment__status" :class="{ 'paid': isPaid}">
      <div class="icon__wrapper" @click="openModal">
        <img v-if="isPaid" src="@/assets/icon.png" alt="">
        <font-awesome-icon class="icon" icon="fas fa-pen" size="lg" />
      </div>
      <div class="line" :class="{ 'first': isTheFirst, 'last': isTheLast }">
        <div class="line__left">
          <AddPaymentButton v-if="isTheFirst"  @click.native="addPayment(index)"/>
        </div>
        <div class="line__right">
          <AddPaymentButton @click.native="addPayment((index + 1))" />
          <span>Agregar Pago</span>
        </div>
      </div>
    </div>
    <PaymentForm 
      v-if="mode === 'editing' && payment.status !== 'paid'"
      :paymentIndex="index"
      :payment="payment"
    />
    <PaymentView
      v-else
      :payment="payment"
    />
  </div>
</template>

<script>
import AddPaymentButton from './AddPaymentButton.vue';
import PaymentForm from './PaymentForm.vue';
import PaymentView from './PaymentView.vue';

export default {
  name: "PaymentItem",
  components: { AddPaymentButton, PaymentForm, PaymentView },
  props: {
    payment: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    isTheLast: {
      type: Boolean,
      required: true
    },
    isTheFirst: {
      type: Boolean,
      required: true
    },
    mode: {
      type: String,
      required: true
    }
  },
  computed: {
    isPaid() {
      return this.payment.status === 'paid'
    }
  },
  methods: {
    addPayment(position) {
      this.$emit('add-payment', position)
    },
    openModal() {
      this.$store.dispatch('open', this.payment)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/variables";
@import "@/assets/scss/base/mixins";
.payment {

  display: flex;
  flex-direction: column;
  align-items: center;

  &__status {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 8px;

    &>.icon__wrapper {
      width: 48px;
      height: 48px;
      background-color: #F8FAFC;
      border: 3px solid #1D4ED8;
      border-radius: 100%;
      z-index: 20;
      cursor: pointer;
      padding: 8px 6px 8px 10px;

      & > .icon {
        display: none;
        margin-top: 2px;
        margin-left: 1px;
        color: #1D4ED8;
      }
      &:hover > .icon {
        display: block;
      }
      
      & > img {
        width: 26px;
      }
    }
    &.paid {
      &>.icon__wrapper {
        background-color: #10B981;
        border: 3px solid #10B981;

        &:hover > .icon {
        display: none;
      }
      }
      & .line__left::before, & .line__right::before {
        background-color: #10B981;
      }
    }
  }

}

.line {
  position: absolute;
  left: 0;
  width: 150%;
  height: 100%;
  display: flex;

  &__left,
  &__right {
    height: 100%;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      height: 1px;
      background-color: #E2E8F0;
    }

    &>.add-payment-button {
      position: absolute;
      top: calc(50% - 18px);
      z-index: 20;
      opacity: 0;
    }
  }

  &__left {
    width: 33%;

    &::before {
      width: 33%;
    }

    &>.add-payment-button {
      opacity: 1;
      left: 0;
    }

    .paid .first & {
      &::before {
        content: none;
      }
      &>.add-payment-button {
        display: none;
      }
    }

    .first & {
      opacity: 0;

      &:hover {
        opacity: 1;
      }
    }
  }

  &__right {
    width: 67%;
    position: relative;
    &::before {
      width: 50%;
    }

    .last & > .add-payment-button {
      opacity: 1;
    }
    & > span {
      opacity: 0;
      position: absolute;
      top: 100%;
      left: calc(50% - 40px);
      font-weight: 400;
      font-size: 12px;
      line-height: 18px;
      text-align: center;
      letter-spacing: 0.02em;
      color: #64748B;
    }
    .last & > span {
      opacity: 1;
    }

    &>.add-payment-button {
      left: calc(50% - 18px);
    }

    &:hover>.add-payment-button {
      opacity: 1;
    }
    .paid &>.add-payment-button {
      display: none;
    }
    .paid .last & {
      display: none;
    }
  }
}
</style>