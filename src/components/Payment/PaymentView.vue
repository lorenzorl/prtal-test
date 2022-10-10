<template>
  <div class="payment">
    <h3 class="payment__name">
      {{ payment.name }}
    </h3>
    <span class="payment__percent">
      <b>{{ payment.amount }} UF</b>
      ({{ payment.percent }}%)
    </span>
    <span class="payment__date">
      {{ date }}
    </span>
  </div>
</template>

<script>
export default {
  name: "PaymentView",
  props: {
    payment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      MONTHS: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
      ]
    }
  },
  computed: {
    date() {
      let date = null;
      if (this.payment.status === 'paid') {
        date = this.payment.paymentDate
      } else {
        date = this.payment.creationDate
      }
      return `${date.getDate()} ${this.MONTHS[date.getMonth()].substring(0, 3)}, ${date.getFullYear()}`
    }
  }
}

</script>

<style lang="scss" scoped>
.payment {

display: flex;
flex-direction: column;
align-items: center;

&__name {
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: #0F172A;
  margin: 0;
  margin-bottom: 8px;
}

&__percent {
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #0F172A;
  margin-bottom: 8px;
}

&__date {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
}

}
</style>