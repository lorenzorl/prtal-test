<template>
  <div class="payment-form">
    <InputText
      class="payment-form__name"
      type="text"
      name="name"
      :value="payment.name"
      @input="val => updateName(val)"
    />
    <InputNumber
      class="payment-form__amount"
      type="number"
      name="amount"
      :currency="currency"
      :max="payment.max"
      :value="payment.amount"
      @input="val => updateAmount(val)"
    />
    <InputPercent
      :value="payment.percent"
      @change="(val) => updatePercent(val)"
    />
    <InputDate
      label="Vence"
      prefix="cs"
      :date="payment.creationDate"
      @change="(val) => updateDate(val)"
    />
  </div>
</template>

<script>
import InputPercent from '../Form/InputPercent.vue';
import InputText from '../Form/InputText.vue';
import InputNumber from '../Form/InputNumber.vue';
import InputDate from '../Form/InputDate.vue';

export default {
  name: "PaymentForm",
  components: { InputPercent, InputText, InputNumber, InputDate },
  props: {
    payment: {
      type: Object,
      required: true
    },
    paymentIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    total() {
      return this.$store.state.payments.total
    },
    counterToUpdate() {
      return this.$store.state.payments.counterToUpdate
    },
    currency() {
      return this.$store.state.payments.currency
    }
  },
  methods: {
    calculatePercent(rawAmount) {
      const amount = rawAmount;
      const percent = amount * 100 / this.total

      return { amount, percent }
    },
    calculateAmount(rawPercent) {
      const percent = rawPercent;
      const amount = percent * this.total / 100

      return { amount, percent }
    },
    updatePayments(paymentDifference) {
      this.$store.dispatch('editPayment', {
        difference: paymentDifference,
        id: this.payment.id
      })
    },
    updateAmount(newAmount) {
      const amountDifference = newAmount - this.payment.amount
      const percentDifference = (amountDifference * 100 / this.total);

      this.updatePayments({
        percent: percentDifference,
        amount: amountDifference
      })
    },
    updatePercent(newPercent) {
      const percentDifference = newPercent - this.payment.percent;
      const amountDifference = (this.total * 0.01 * percentDifference)

      this.updatePayments({
        percent: percentDifference,
        amount: amountDifference
      })
    },
    updateName(name) {
      this.$store.dispatch('editPaymentName', {
        id: this.payment.id,
        name,
      })
    },
    updateDate(date) {
      this.$store.dispatch('editPaymentCreationDate', {
        id: this.payment.id,
        date,
      });
    }
  }
}

</script>

<style lang="scss" scoped>
.payment-form {

  input[type="text"],
  &__amount {
    width: 150px;
    display: flex;
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 5px 10px;

    &:focus-visible {
      outline-color: #1e4fd9;
    }
  }

  input[type="text"] {
    font-weight: 600;
    font-size: 18px;
    line-height: 20px;
    color: #0F172A;
  }

  &__amount {
    font-weight: 600;
    font-size: 12px;
    line-height: 17px;
    color: #0F172A;
  }
}
</style>